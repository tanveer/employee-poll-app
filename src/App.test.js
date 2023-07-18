import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, MemoryRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import reducers from "./Redux/reducers";
import Login from "./component/Login";
import NewPoll from "./component/NewPoll";
import { _saveQuestion } from "./_DATA";
import { saveNewQuestion } from "./api";
import { handleSaveNewPollQuestion } from "./actions/shared";
const mockStore = configureStore([thunk]);

describe("Login", () => {
  let store, component;

  beforeEach(() => {
    store = mockStore({
      authedUser: null,
      users: {
        mtsamis: {
          id: "mtsamis",
          name: "Mike Tsamis",
        },
        zoshikanlu: {
          id: "zoshikanlu",
          name: "Zenobia Oshikanlu",
        },
      },
    });

    store.replaceReducer(reducers);

    component = render(
      <Provider store={store}>
        <Router>
          <Login />
        </Router>
      </Provider>
    );
  });

  it("should show an option for each user", async () => {
    const options = screen.queryAllByRole("option").map((option) => ({
      id: option.value,
      name: option.textContent,
    }));
    const users = Object.values(store.getState().users);
    users.forEach((user) => {
      const option = options.filter(({ id }) => id === user.id).pop();
      expect(option).toMatchObject(user);
    });
  });

  it("should select a user", () => {
    const dropdown = screen.getByRole("combobox");
    const option = screen.getByRole("option", { name: "Mike Tsamis" });
    fireEvent.change(dropdown, { target: { value: option.value } });
    expect(option.selected).toBe(true);
  });

  it("should match the snapshot", () => {
    expect(component).toMatchSnapshot();
  });
});

describe("New Poll Question", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      users: {
        sarahedo: {
          id: "sarahedo",
          password: "password123",
          name: "Sarah Edo",
          avatarURL: "https://i.ibb.co/42Z3Xgz/employee3.png",
          answers: {},
          questions: [],
        },
      },
      questions: {},
    });
  });

  it("allows creating a new poll question", async () => {
    const expectation = {
      id: expect.any(String),
      author: "sarahedo",
      timestamp: expect.any(Number),
      optionOne: {
        votes: expect.any(Array),
        text: expect.any(String),
      },
      optionTwo: {
        votes: expect.any(Array),
        text: expect.any(String),
      },
    };

    render(
      <Provider store={store}>
        <MemoryRouter>
          <NewPoll />
        </MemoryRouter>
      </Provider>
    );

    const optionOneInput = screen.getByLabelText("Option One");
    const optionTwoInput = screen.getByLabelText("Option Two");
    const submitButton = screen.getByText("Submit");

    // Simulate user input
    fireEvent.change(optionOneInput, { target: { value: "Learn Java" } });
    fireEvent.change(optionTwoInput, { target: { value: "Learn Python" } });

    // Submit the form
    const authedUser = "sarahedo";
    const poll = {
      author: authedUser,
      optionOne: optionOneInput.value,
      optionTwo: optionTwoInput.value,
    };
    console.log("Option one: ", poll.optionOne);

    const saved_poll_question = saveNewQuestion(
      authedUser,
      poll.optionOne,
      poll.optionTwo
    );
    expect(saved_poll_question).resolves.toMatchObject(expectation);
  });
});
