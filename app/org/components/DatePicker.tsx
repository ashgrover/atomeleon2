import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";


type State = {
    selectedDate: Date | undefined;
}

export default function DatePicker({ }) {
    const [state, setState] = useState<State>({ selectedDate: undefined });

    const onSelectDate = (date: Date | undefined) => {
        console.log(date)
        if (!date) return;
        
        setState(state => ({ ...state, selectedDate: date }));
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    size="sm"
                    variant={"outline"}
                    className="w-[180px] pl-3 text-left font-normal">
                    {!state.selectedDate ? <span>Pick a date</span> : state.selectedDate.toDateString()}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={state.selectedDate}
                    onSelect={onSelectDate}
                    disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                />
            </PopoverContent>
        </Popover>

    )
}

