import * as Form from "@radix-ui/react-form";

export function SearchInput() {
  return (
    <Form.Root>
      <Form.Field name="search">
        <Form.Control asChild>
          <input
            className="inline-flex items-center justify-center rounded-md text-base bg-black/10 py-2 h-10 w-96 px-2 outline-none focus:shadow-[0_0_0_2px_black] hover:shadow-[0_0_0_1px_black]"
            placeholder="Search"
            type="search"
          />
        </Form.Control>
      </Form.Field>
    </Form.Root>
  );
}
