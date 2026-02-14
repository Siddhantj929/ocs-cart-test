import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const LANGUAGES = [
    {
        code: 'INR',
        title: "Indian Rupee",
        symbol: "₹"
    },
    {
        code: 'IDR',
        title: "Indonesian Rupiah",
        symbol: "Rp"
    },
    {
        code: 'USD',
        title: "United States Dollar",
        symbol: "$"
    }
]

const CurrencySwitch = () => {

    return (
        <Select>
            <SelectTrigger className="w-24">
                <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {LANGUAGES.map(lang => <SelectItem key={lang.code} value={lang.code}>{lang.code} - {lang.symbol}</SelectItem>)}
                </SelectGroup>
            </SelectContent>
        </Select>)
}

export default CurrencySwitch