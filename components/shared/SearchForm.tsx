"use client";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from "../ui/input-group";
import { Search } from "lucide-react";
import {useDebouncedCallback} from "use-debounce"
const SearchForm = ({placeholder}:{placeholder:string}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("page","1")
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  },300);

  return (
    <div className="max-w-[300px]">
      <InputGroup>
        <InputGroupInput
          id="query"
          name="query"
          placeholder={placeholder}
          defaultValue={searchParams.get("query")?.toString()}
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
        />
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
};
export default SearchForm;
