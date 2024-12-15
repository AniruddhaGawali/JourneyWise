import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

function AvailableDatesInput({
  value,
  onChange,
}: {
  value: string[];
  onChange: (dates: string[]) => void;
}) {
  const [currentDate, setCurrentDate] = useState<string>("");

  const addDate = () => {
    if (currentDate && !value.includes(currentDate)) {
      onChange([...value, currentDate]);
      setCurrentDate("");
    }
  };

  const removeDate = (dateToRemove: string) => {
    onChange(value.filter((date) => date !== dateToRemove));
  };

  return (
    <FormItem>
      <FormLabel>Available Dates</FormLabel>
      <div className="flex items-center space-x-2">
        <FormControl>
          <Input
            type="date"
            value={currentDate}
            onChange={(e) => setCurrentDate(e.target.value)}
          />
        </FormControl>
        <Button
          type="button"
          variant="outline"
          onClick={addDate}
          disabled={!currentDate}
        >
          Add Date
        </Button>
      </div>
      <FormDescription>
        Select and add multiple available dates for the package
      </FormDescription>

      {value.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {value.map((date) => (
            <div
              key={date}
              className="flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm"
            >
              {new Date(date).toLocaleDateString("en-US", {
                weekday: "short",
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
              <button
                type="button"
                onClick={() => removeDate(date)}
                className="ml-2 text-destructive hover:text-destructive/80"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
      <FormMessage />
    </FormItem>
  );
}

export default AvailableDatesInput;
