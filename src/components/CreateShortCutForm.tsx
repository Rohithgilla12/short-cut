import React from "react";
import { trpc } from "../utils/trpc";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface CreateShortCutFormProps {}

const CreateShortCutForm: React.FC<CreateShortCutFormProps> = ({}) => {
  const createShortLink = trpc.useMutation(["shortCut.createShortLink"]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    const url = form.get("url") as string;
    const slug = form.get("slug") as string;

    console.log(url, slug);

    await createShortLink.mutateAsync({
      url,
      slug,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-control flex flex-col w-full m-4">
        <label className="label">
          <span className="label-text">Full URL</span>
        </label>
        <input
          type="text"
          placeholder="Type here"
          id="url"
          name="url"
          className="input input-bordered w-full max-w-xs"
        />

        <label className="label">
          <span className="label-text">Short Name</span>
        </label>
        <input
          type="text"
          placeholder="Type here"
          id="slug"
          name="slug"
          className="input input-bordered w-full max-w-xs"
        />
        <br />
        <button type="submit" className="btn btn-outline btn-success p-2">
          Create Shortlink
        </button>
      </div>
    </form>
  );
};

export default CreateShortCutForm;
