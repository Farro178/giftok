import * as Form from "@radix-ui/react-form";

export function SearchInput() {
  return (
    <Form.Root>
      <Form.Field name="search">
        <Form.Control asChild>
          <input
            className="inline-flex h-10 w-96 items-center justify-center rounded-md bg-black/10 px-2 py-2 text-base outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black]"
            placeholder="Search"
            type="search"
          />
        </Form.Control>
      </Form.Field>
    </Form.Root>
  );
}
