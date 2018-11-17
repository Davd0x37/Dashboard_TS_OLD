import { VElement } from "../Interfaces";
import { update } from "../VDOM";

export const updateVComponent = (prevElem: VElement, nextElem: VElement) => {
  const { instance }: any = prevElem;
  const { _currentElement } = instance;

  const prevProps = prevElem.props;
  const nextProps = nextElem.props;

  nextElem.dom = prevElem.dom;
  nextElem.instance = prevElem.instance;
  nextElem.instance!.props = { ...prevProps, ...nextProps };

  const prevRender = _currentElement;
  const nextRender = instance.render();
  nextElem.instance._currentElement = nextRender;

  update(prevRender, nextRender);
};
