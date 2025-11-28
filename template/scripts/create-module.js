const { argv } = require("process");
const { join } = require("path");
const fs = require("fs/promises");

const PATH_TO_WRITE = join(__dirname, "../", "src");

const ModuleKeys = {
  NAME: "name",
  HOOKS: "hooks",
  COMPONENTS: "components",
  SCREENS: "screens",
  LAYOUTS: "layouts",
};

const INDEX_DATA = `
export * from "./screens";
export * from "./store";
export * from "./hooks";
`;

const args = argv.splice(2).reduce((acc, cur) => {
  const string = cur.replace("--", "");
  const [key, value] = string.split("=");

  return { ...acc, [key]: value.split(",") };
}, {});

const createStore = async (path, name, slug) => {
  const storeData = `import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
  
import { zustandStorage } from "~/lib/storage";
  
export type ${slug}State = {
  ${name}: unknown;
  set${slug}: (${name}: unknown) => void;
};
  
export const use${slug}Store = create<${slug}State>()(
  persist(
    set => ({
      ${name}: undefined,
      set${slug}: ${name} => set(state => ({ ...state, ${name} })),
    }),
    { name: "${name}", storage: createJSONStorage(() => zustandStorage) },
  ),
);
  `;

  await fs.mkdir(join(path, "store"));
  await fs.writeFile(join(path, "store", "index.ts"), storeData, { flag: "w+" });
};

const createModuleBase = async path => {
  await fs.mkdir(path);
  await fs.writeFile(join(path, "index.ts"), INDEX_DATA, { flag: "a+" });
  await fs.writeFile(join(path, "types.ts"), "", { flag: "a+" });

  await fs.mkdir(join(path, "components"));
  await fs.writeFile(join(path, "components", "index.ts"), "", { flag: "a+" });

  await fs.mkdir(join(path, "screens"));
  await fs.writeFile(join(path, "screens", "index.ts"), "", { flag: "a+" });

  await fs.mkdir(join(path, "layouts"));
  await fs.writeFile(join(path, "layouts", "index.ts"), "", { flag: "a+" });
};

const createBaseComponent = async (path, name) => {
  const data = `import React from "react";
import { View } from "~/ui/components/atoms";

type ${name}Props = {};

export const ${name}:React.FC<${name}Props> = () => <View />;
`;

  await fs.writeFile(join(path, "components", name + ".tsx"), data, { flag: "w+" });
};

const createScreen = async (path, name) => {
  const data = `import React from "react";
import { Screen } from "~/ui/components/atoms";

export const ${name}:React.FC = () => <Screen />;
`;

  await fs.writeFile(join(path, "screens", name + ".tsx"), data, { flag: "w+" });
};

const createHook = async (path, name) => {
  const data = `export const ${name} = () => {};`;

  await fs.writeFile(join(path, "hooks", name + ".ts"), data, { flag: "w+" });
};

const createLayout = async (path, name) => {
  const data = `import React from "react";
import { View } from "~/ui/components/atoms";

type ${name}Props = {};

export const ${name}:React.FC<${name}Props> = () => <View />;
`;

  await fs.writeFile(join(path, "layouts", name + ".tsx"), data, { flag: "w+" });
};

const appendIndexFile = async (path, dir, names) => {
  let data = "";

  for (let i = 0; i < names.length; i++) {
    data += `\nexport {${names[i]}} from "./${names[i]}";`;
  }

  await fs.writeFile(join(path, dir, "index.ts"), data, { flag: "w+" });
};

const nameAction = async (path, data) => {
  const [name] = data;
  const slug = name[0].toUpperCase() + name.slice(1);

  await createModuleBase(path);
  await createStore(path, name, slug);
};

const componentsAction = async (path, data) => {
  data.map(async name => {
    await createBaseComponent(path, name);
  });

  await appendIndexFile(path, "components", data);
};

const screensAction = async (path, data) => {
  data.map(async name => {
    await createScreen(path, name);
  });
  await appendIndexFile(path, "screens", data);
};

const hooksAction = async (path, data) => {
  await fs.mkdir(join(path, "hooks"));
  await fs.writeFile(join(path, "hooks", "index.ts"), "", { flag: "w+" });

  data.map(async name => {
    await createHook(path, name);
  });
  await appendIndexFile(path, "hooks", data);
};

const layoutsAction = async (path, data) => {
  data.map(async name => {
    await createLayout(path, name);
  });
  
  await appendIndexFile(path, "layouts", data);
};

const ScriptActions = {
  [ModuleKeys.NAME]: nameAction,
  [ModuleKeys.COMPONENTS]: componentsAction,
  [ModuleKeys.HOOKS]: hooksAction,
  [ModuleKeys.SCREENS]: screensAction,
  [ModuleKeys.LAYOUTS]: layoutsAction,
};

const createModule = async () => {
  const moduleName = args.name[0];

  if (!moduleName) {
    throw new Error("No module name provided. Pass --name=<moduleName> param to add module name");
  }

  const modulePath = join(PATH_TO_WRITE, moduleName);

  for (const [key, value] of Object.entries(args)) {
    await ScriptActions[key](modulePath, value);
  }
};

createModule();

console.info(args);
