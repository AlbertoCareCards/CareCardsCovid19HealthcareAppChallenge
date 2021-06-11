/**
 * Collection of useful methods for handling DOM elements.
 * @param Class
 * @return {{new(): DomManipulator, prototype: DomManipulator}}
 */
export default function domManipulator(Class) {
  return class DomManipulator extends Class {
    /**
     * Given DOM element calculates the screen coordinates of its center.
     * @param element
     * @return {{x: *, y: *}}
     */
    getScreenCenterCoordinates(element) {
      const dimensions = element.getClientRects()[0];
      return {
        x: dimensions.left + (dimensions.width / 2),
        y: dimensions.top + (dimensions.height / 2)
      }
    }
  }
}
