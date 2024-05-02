import { useState } from "react";

export function CreateModal({ onAdd }: { onAdd: (name: string) => void }) {
  const [inputState, setInputState] = useState("");

  const handleAdding = (closeModalOnSubmit?: boolean) => {
    setInputState("");
    onAdd(inputState);

    //* pass closeModalOnSubmit boolean to close modal
    if (closeModalOnSubmit) {
      (document?.getElementById("createModal") as HTMLFormElement)?.close();
    }
  };

  return (
    <dialog id="createModal" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Create new todo</h3>

        <div className="modal-action block">
          <form method="dialog" className="flex flex-col gap-6">
            <input
              type="text"
              value={inputState}
              placeholder="Type here"
              onChange={(e) => setInputState(e.target.value)}
              className="input input-bordered w-full min-h-10"
            />

            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                handleAdding();
              }}
              disabled={inputState === "" || inputState == null}
              className="btn btn-active btn-primary"
            >
              Submit
            </button>
          </form>
        </div>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
