import { FormUserScore } from "./FormUserScore";
import { render, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

it("submits form", async () => {
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

  await waitFor(() => {
    const submit = wrapper.getByText("Submit Your Score");
    userEvent.click(submit);
  });

  const message = await wrapper.getByText("Score Submitted");
  expect(message).toBeInTheDocument();
});
