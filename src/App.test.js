import { render, screen } from "@testing-library/react";
import App from "./App";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter
import configureMockStore from "redux-mock-store";

const mockStore = configureMockStore();
const store = mockStore({});

describe("App", () => {
  it("should render Navbar when users exist", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <App users={true} />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByTestId("navbar-component")).toBeInTheDocument();
  });

  it("should render NewPoll component when authedUser exists and path is '/new_poll'", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <App authedUser={true} />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByTestId("new-poll-component")).toBeInTheDocument();
  });

  it("should render Leaderboard component when authedUser exists and path is '/leaderboard'", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <App authedUser={true} />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByTestId("leaderboard-component")).toBeInTheDocument();
  });
});
