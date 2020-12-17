const path = require("path");
const Eleventy = require("@11ty/eleventy");
const _ = require("lodash");

async function compile(env, overrides) {
  const argv = _.merge(
    {
      config: ".eleventy.js",
      port: 8080,
    },
    overrides
  );

  process.chdir(env.cwd);

  //
  let elev = new Eleventy(argv.input, argv.output, {
    quietMode: argv.quiet,
  });

  elev.setConfigPathOverride(argv.config);
  elev.setPathPrefix(argv.pathprefix);
  elev.setDryRun(argv.dryrun);
  elev.setIncrementalBuild(argv.incremental);
  elev.setPassthroughAll(argv.passthroughall);
  elev.setFormats(argv.formats);

//   elev
//   .init()
//   .then(function () {
//     if (argv.version) {
//       console.log(elev.getVersion());
//     } else if (argv.help) {
//       console.log(elev.getHelp());
//     } else if (argv.serve) {
//       elev.watch().then(function () {
//         elev.serve(argv.port);
//       });
//     } else if (argv.watch) {
//       elev.watch();
//     } else {
//       elev.write();
//     }
//   })

  // careful, we can’t use async/await here to error properly
  // with old node versions in `please-upgrade-node` above.
  await elev.init();
  if (argv.version) {
    console.log(elev.getVersion());
  } else if (argv.help) {
    console.log(elev.getHelp());
  } else if (argv.serve) {
    return elev.watch().then(function () {
      elev.serve(argv.port);
    });
  } else if (argv.watch) {
    return elev.watch();
  } else {
    return elev.write();
  }

}

module.exports = {
  compile,
};
