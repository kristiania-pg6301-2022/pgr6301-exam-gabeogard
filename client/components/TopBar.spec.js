import renderer from "react-test-renderer";
import { NavBar } from "./TopBar";

describe("TopBar", () => {
  it("should render NavBar", () => {
    const component = renderer.render(<NavBar />);

    const asJson = component.toJSON();

    expect(asJson).toMatchSnapshot();
  });
});
