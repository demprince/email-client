import React from "react";

import { shallow, mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";

import MessageSelector from "containers/MessageSelector";
import MessagePreview from "containers/MessagePreview";
import App from "containers/App";

import NoMatch from "components/NoMatch";
import Error from "components/Error";
import MessageContent from "components/MessageContent";
import Loader from "components/Loader";
import MessageListItem from "components/MessageListItem";

describe("Components render", () => {
  it("MessageSelector renders without crashing", () => {
    shallow(<MessageSelector />);
  });

  it("MessagePreview renders without crashing", () => {
    shallow(<MessagePreview />);
  });

  it("MessageContent renders without crashing", () => {
    shallow(<MessageContent data={"<div></div>"} />);
  });

  it("MessageListItem renders without crashing", () => {
    const data = {
      title: "some title",
      subject: "some subject"
    };
    shallow(<MessageListItem data={data} />);
  });

  it("Error renders without crashing", () => {
    shallow(<Error />);
  });

  it("Loader renders without crashing", () => {
    shallow(<Loader />);
  });

  it("NoMatch renders without crashing", () => {
    shallow(<NoMatch location={{ pathname: "/test" }} />);
  });
});

// Routing tests

describe("Test routes", () => {
  test("invalid path should redirect to 404", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/random"]}>
        <App />
      </MemoryRouter>
    );
    expect(wrapper.find(MessageSelector)).toHaveLength(0);
    expect(wrapper.find(NoMatch)).toHaveLength(1);
    wrapper.unmount();
  });

  test("invalid path should redirect to 404", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/email/"]}>
        <App />
      </MemoryRouter>
    );
    expect(wrapper.find(MessageSelector)).toHaveLength(0);
    expect(wrapper.find(NoMatch)).toHaveLength(1);
    wrapper.unmount();
  });

  test("valid email/ path should render an email", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/email/1"]}>
        <App />
      </MemoryRouter>
    );
    expect(wrapper.find(MessagePreview)).toHaveLength(1);
    expect(wrapper.find(NoMatch)).toHaveLength(0);
    wrapper.unmount();
  });

  /*
    //fails as it involves fetching data
    test('valid / path should render the message list', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/']}>
                <App />
            </MemoryRouter>
        );
        expect(wrapper.find(MessageSelector)).toHaveLength(1);
        expect(wrapper.find(NoMatch)).toHaveLength(0);
        wrapper.unmount();
    });
     */
});
