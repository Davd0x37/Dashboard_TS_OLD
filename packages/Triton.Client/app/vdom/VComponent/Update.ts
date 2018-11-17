import { VComponent } from "../Interfaces";
import { update } from "../VDOM";

// It will starts if you use other component in main component
export const updateVComponent = (
  prevElem: VComponent,
  nextElem: VComponent
) => {
  // Update only if both components has instance property
  if (prevElem.instance && nextElem.instance) {
    // Get previous instance
    const { instance }: VComponent = prevElem;
    // Get previous rendered view
    const { _currentElement } = instance;

    // Get props
    const prevProps = prevElem.props;
    const nextProps = nextElem.props;

    // Copy reference to generated DOM Tree (Not VNodes)
    nextElem.dom = prevElem.dom;
    // Copy instance and props
    nextElem.instance = prevElem.instance;
    nextElem.instance.props = { ...prevProps, ...nextProps };

    // Save old render and render new
    const prevRender = _currentElement;
    const nextRender = instance.render();
    nextElem.instance._currentElement = nextRender;

    // Update childrens
    // Pass DOM Tree not instance (VNodes)
    update(prevRender, nextRender);
  }
};
