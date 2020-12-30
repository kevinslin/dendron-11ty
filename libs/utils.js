const path = require("path");
const { createLogger, resolvePath } = require("@dendronhq/common-server");
const env = require(path.join(__dirname, "..", "_data", "processEnv.js"));
const { EngineConnector, DConfig } = require("@dendronhq/engine-server");
const fs = require("fs-extra");
const _ = require("lodash");

function removeExtension(nodePath, ext) {
  const idx = nodePath.lastIndexOf(ext);
  if (idx > 0) {
    nodePath = nodePath.slice(0, idx);
  }
  return nodePath;
}

const getEngine = async () => {
  const engineConnector = EngineConnector.getOrCreate({
    wsRoot: env.wsRoot,
  });
  if (!engineConnector.initialized) {
    await engineConnector.init({ portOverride: env.enginePort });
  }
  const engine = engineConnector.engine;
  return engine;
};

const getDendronConfig = () => {
  const wsRoot = env.wsRoot;
  const config = DConfig.getOrCreate(wsRoot);
  config.site = DConfig.cleanSiteConfig(config.site);
  return config;
};

const getSiteConfig = () => {
  return getDendronConfig().site;
};

const logger = () => {
  const logger = createLogger();
  return logger;
};

const getSiteOutputPath = () => {
  const wsRoot = env.wsRoot;
  const config = getDendronConfig();
  // custom override
  if (env.output) {
    return resolvePath(env.output, wsRoot);
  }
  if (env.stage === "dev") {
    siteRootPath = path.join(wsRoot, "build", "site");
    fs.ensureDirSync(siteRootPath);
  } else {
    siteRootPath = resolvePath(config.site.siteRootDir, wsRoot);
  }
  return siteRootPath;
};

const getNavOutput = () => {
  return path.join(getSiteOutputPath(), "nav.html")
}

const getMetaPath = () => {
  return path.join(getSiteOutputPath(), ".meta")
}

class NOTE_UTILS {
  static getUrl(note) {
    return _.get(
      note,
      "custom.permalink",
      `${path.join(getSiteConfig().siteNotesDir, note.id)}.html`
    );
  };

  static getAbsUrl(suffix) {
    suffix = suffix || "";
    const siteUrl = getSiteConfig().siteUrl;
    if (siteUrl && env.stage !== "dev") {
      const out = _.trimEnd(_.join([_.trimEnd(siteUrl, "/"), _.trim(suffix, "/")], "/"), "/");
      return out;
    } else {
      return "http://" + path.join(`localhost:${env.elevPort || 8080}`, suffix);
    }
  };

  static notes2Id(url, notes) {
    const noteId = removeExtension(url.split("/").slice(-1)[0], ".html");
    const note = _.get(notes, noteId, "");
    return note;
  };
}

module.exports = {
  getEngine,
  env,
  getDendronConfig,
  getSiteConfig,
  logger,
  resolvePath,
  getSiteOutputPath,
  NOTE_UTILS,
  getNavOutput,
  getMetaPath
};
