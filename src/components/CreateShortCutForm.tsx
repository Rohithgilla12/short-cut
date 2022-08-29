import React from "react";
import copy from "copy-to-clipboard";
import { trpc } from "../utils/trpc";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface CreateShortCutFormProps {}

const CreateShortCutForm: React.FC<CreateShortCutFormProps> = ({}) => {
  const createShortLink = trpc.useMutation(["shortCut.createShortLink"]);

  const [url, setUrl] = React.useState("");
  const [slug, setSlug] = React.useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    const url = form.get("url") as string;
    const slug = form.get("slug") as string;

    setUrl(url);
    setSlug(slug);

    await createShortLink.mutateAsync({
      url,
      slug,
    });
  };

  return (
    <>
      {/* Show URL and slug along with copy button */}
      {url && slug && (
        <div className="flex flex-col items-center justify-center">
          <p>Created link with given details</p>
          <div className="flex flex-col items-center justify-center">
            <p>URL: {url}</p>
            <p>Slug: {slug}</p>
          </div>
          <button
            onClick={() => {
              copy(`https://short-cut-redis.vercel.app/r/${slug}`);
            }}
            className="btn btn-square btn-outline"
          >
            Copy
          </button>
        </div>
      )}
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
    </>
  );
};

export default CreateShortCutForm;
