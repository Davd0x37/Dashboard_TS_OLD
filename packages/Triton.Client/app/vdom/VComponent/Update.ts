import { VComponent, vClass } from "../Interfaces";
import { update } from "../VDOM";

// It will starts if you use other component in main component
export const updateVComponent = (
  prevElem: VComponent,
  nextElem: VComponent
) => {
  // Update only if both components has instance property
  if (prevElem.instance) {
    // Get previous instance
    const { instance }: VComponent = prevElem;
    // Get previous rendered view
    const { pCurrentElement }: vClass = instance;

    // Get props
    const prevProps = prevElem.props;
    const nextProps = nextElem.props;

    // Copy reference
    nextElem.dom = prevElem.dom;
    // Copy instance and props
    nextElem.instance = instance;
    nextElem.instance.props = { ...prevProps, ...nextProps };

    // Save old render and render new one
    const prevRender = pCurrentElement;
    const nextRender = nextElem.instance.render();
    nextElem.instance.pCurrentElement = nextRender;

    // Update childrens
    // Pass DOM Tree not instance (VNodes)
    update(prevRender, nextRender);
  }
};
