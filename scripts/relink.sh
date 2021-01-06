# ENGINE_SERVER_VERSION="0.23.1-alpha.0"
# COMMON_SERVER_VERSION="0.22.2-alpha.0"

ENGINE_VERSION=`cat ../dendron/meta.json | jq -r '.["@dendronhq/engine-server"]'`
COMMON_SERVER_VERSION=`cat ../dendron/meta.json | jq -r '.["@dendronhq/common-server"]'`

pkg1="@dendronhq/engine-server@$ENGINE_VERSION"
pkg2="@dendronhq/common-server@$COMMON_SERVER_VERSION"

yarn unlink @dendronhq/engine-server
yarn unlink @dendronhq/common-server

echo "installing $pkg1"
yarn add --force $pkg1
echo "installing $pkg2"
yarn add --force $pkg2


# VERSION="0.22.2-alpha.0"

# ENGINE_VERSION=`cat ../../dendron/meta.json | jq -r '.["@dendronhq/engine-server"]'`
# COMMON_SERVER_VERSION=`cat ../../dendron/meta.json | jq -r '.["@dendronhq/common-server"]'`
# COMMON_TEST_UTILS_VERSION=`cat ../../dendron/meta.json | jq -r '.["@dendronhq/common-test-utils"]'`

# pkg1="@dendronhq/engine-server@$ENGINE_VERSION"
# pkg2="@dendronhq/common-all@$COMMON_ALL_VERSION"
# pkg3="@dendronhq/common-test-utils@$COMMON_TEST_UTILS_VERSION"
# yarn unlink @dendronhq/engine-server
# yarn unlink @dendronhq/common-all
# yarn unlink @dendronhq/common-test-utils
# echo "installing $pkg"
# yarn add --force $pkg1
# yarn add --force $pkg2
# yarn add --force $pkg3
