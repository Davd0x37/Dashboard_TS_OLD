export enum MetdataKey {
  COMPONENT = 1,
  PROP,
  METHOD
}

function getKey(key: MetdataKey): any {
  switch (key) {
    case MetdataKey.COMPONENT: {
      return /\$Component/g;
    }
    case MetdataKey.PROP: {
      return /\$Property/g;
    }
    case MetdataKey.METHOD: {
      return /\$Method/g;
    }
  }
}

export const getMetadataKeys = (component: any[], keyPattern?: MetdataKey) => {
  return component.map(comp => {
    const properties = Reflect.getMetadataKeys(comp).filter(
      (prop: string) => (keyPattern ? prop.match(getKey(keyPattern)) : prop)
    );
    return {
      component: comp,
      properties
    };
  });
};
