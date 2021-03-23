import { FormUserScore } from "./FormUserScore";
import { render, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { setupServer } from "msw/node";

const server = setupServer();

const mockEndpointScoreCreate = rest.post(
  "http://localhost:3000/api/score/create",
  (req, res, ctx) => {
    console.log("resolved");
    return res(ctx.json(true));
  }
);

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

it("submits form", async () => {
  server.use(mockEndpointScoreCreate);

  const wrapper = render(<FormUserScore />);

  const inputName = wrapper.container.querySelector(`input[id=name]`);
  if (inputName) {
    await waitFor(() => {
      fireEvent.change(inputName, { target: { value: "John" } });
    });
  }

  const inputScore = wrapper.container.querySelector(`input[id=score]`);
  if (inputScore) {
    await waitFor(() => {
      fireEvent.change(inputScore, { target: { value: 5 } });
    });
  }

  const submit = await waitFor(() => wrapper.getByText("Submit Your Score"));

  userEvent.click(submit);

  const message = await waitFor(() => wrapper.getByText("Score Submitted"));
  expect(message).toBeInTheDocument();
});
