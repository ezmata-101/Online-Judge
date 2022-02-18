import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import {FormControlLabel} from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const names = [
    'Ad Hoc',
    'Brute Force',
    'BFS',
    'DFS',
    'Dijkstra',
    'SSSP',
    'APSP',
    'Greedy',
    'DP'
];

export default function FilterProblemComponent(props) {
    const [categories, setCategories] = React.useState([]);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setCategories(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    function selectClosed() {
        console.log(categories)
    }

    return (
        <div>
            <FormControl sx={{ m: 1, width: "100%" }}>
                <InputLabel id="demo-multiple-checkbox-label">Categories</InputLabel>
                <Select
                    // labelId="demo-multiple-checkbox-label"
                    id="multiple-checkbox"
                    multiple
                    value={categories}
                    onChange={handleChange}
                    input={<OutlinedInput label="Category" />}
                    renderValue={(selected) => selected.join(', ')}
                    onClose={selectClosed}
                    // MenuProps={MenuProps}
                >
                    {names.map((name) => (
                        <MenuItem key={name} value={name}>
                            <FormControlLabel control={<Checkbox checked={categories.indexOf(name) > -1} />} label={name}></FormControlLabel>
                            {/*<Checkbox checked={categories.indexOf(name) > -1} />*/}
                            {/*<ListItemText primary={name} />*/}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}
