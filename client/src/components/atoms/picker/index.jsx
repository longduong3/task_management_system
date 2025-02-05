import * as React from 'react';
import PropTypes from 'prop-types';
import { Select as BaseSelect } from '@mui/base/Select';
import { Option as BaseOption } from '@mui/base/Option';
import { useTheme } from '@mui/system';
import clsx from 'clsx';
import UnfoldMoreRoundedIcon from '@mui/icons-material/UnfoldMoreRounded';
import log from "eslint-plugin-react/lib/util/log.js";

const getOptionColorClasses = ({ selected, highlighted, disabled }) => {
    let classes = '';
    if (disabled) {
        classes += ' text-slate-400 dark:text-slate-700';
    } else {
        if (selected) {
            classes +=
                ' bg-purple-100 dark:bg-purple-950 text-purple-950 dark:text-purple-50';
        } else if (highlighted) {
            classes +=
                ' bg-slate-100 dark:bg-neutral-800 text-slate-900 dark:text-slate-300';
        }
        classes +=
            ' hover:dark:bg-neutral-800 hover:bg-slate-100 hover:dark:text-slate-300 hover:text-slate-900';
        classes +=
            ' focus-visible:outline focus-visible:outline-2 focus-visible:outline-purple-400 focus-visible:dark:outline-purple-300';
    }
    return classes;
};

const Option = React.forwardRef((props, ref) => {
    return (
        <BaseOption
            ref={ref}
            {...props}
            slotProps={{
                root: ({ selected, highlighted, disabled }) => ({
                    className: `list-none p-2 rounded-lg cursor-default last-of-type:border-b-0 ${getOptionColorClasses(
                        { selected, highlighted, disabled },
                    )}`,
                }),
            }}
        />
    );
});

const Button = React.forwardRef(function Button(props, ref) {
    const { ownerState, ...other } = props;
    return (
        <button type="button" {...other} ref={ref}>
            {other.children}
            <UnfoldMoreRoundedIcon />
        </button>
    );
});

Button.propTypes = {
    children: PropTypes.node,
    ownerState: PropTypes.object.isRequired,
};

function useIsDarkMode() {
    const theme = useTheme();
    return theme.palette.mode === 'dark';
}

export default function UnstyledSelectBasic({label = '', extendStyle='', defaultValue = '', data = [{value: '', text: 'Please select an option'}]}) {
    // Replace this with your app logic for determining dark modes
    const isDarkMode = useIsDarkMode();

    return (
        <div className={`base-class ${isDarkMode ? 'dark' : ''} mb-3 w-full ${extendStyle}`}>
            <div className="label mb-2 text-stone-500">{label}</div>
            <Select defaultValue={defaultValue}>
                {data.map((item, index) => (
                    <Option key={index} value={item.value}>{item.text}</Option>
                ))}
            </Select>
        </div>
    );
}

const resolveSlotProps = (fn, args) => (typeof fn === 'function' ? fn(args) : fn);

const Select = React.forwardRef(function CustomSelect(props, ref) {
    // Replace this with your app logic for determining dark modes
    const isDarkMode = useIsDarkMode();

    return (
        <BaseSelect
            ref={ref}
            {...props}
            className={clsx('CustomSelect', props.className)}
            slots={{
                root: Button,
            }}
            slotProps={{
                ...props.slotProps,
                root: (ownerState) => {
                    const resolvedSlotProps = resolveSlotProps(
                        props.slotProps?.root,
                        ownerState,
                    );
                    return {
                        ...resolvedSlotProps,
                        className: clsx(
                            `relative text-sm font-sans box-border w-full px-3 py-2 rounded-lg text-left bg-white dark:bg-neutral-900 border border-solid border-slate-200 dark:border-neutral-700 text-slate-900 dark:text-neutral-300 transition-all hover:bg-slate-50 dark:hover:bg-neutral-800 outline-0 shadow-md shadow-slate-100 dark:shadow-slate-900 ${
                                ownerState.focusVisible
                                    ? 'focus-visible:ring-4 ring-purple-500/30 focus-visible:border-purple-500 focus-visible:dark:border-purple-500'
                                    : ''
                            } [&>svg]:text-base	[&>svg]:absolute [&>svg]:h-full [&>svg]:top-0 [&>svg]:right-2.5`,
                            resolvedSlotProps?.className,
                        ),
                    };
                },
                listbox: (ownerState) => {
                    const resolvedSlotProps = resolveSlotProps(
                        props.slotProps?.listbox,
                        ownerState,
                    );
                    return {
                        ...resolvedSlotProps,
                        className: clsx(
                            `min-w-80 min-h-40 text-sm font-sans p-1.5 mb-3 w-full rounded-xl overflow-auto outline-0 bg-white dark:bg-neutral-900 border border-solid border-slate-200 dark:border-neutral-700 text-slate-900 dark:text-neutral-300 shadow shadow-slate-200 dark:shadow-neutral-900`,
                            resolvedSlotProps?.className,
                        ),
                    };
                },
                popup: (ownerState) => {
                    const resolvedSlotProps = resolveSlotProps(
                        props.slotProps?.popup,
                        ownerState,
                    );
                    return {
                        ...resolvedSlotProps,
                        className: clsx(
                            `${isDarkMode ? 'dark' : ''} z-9999`,
                            resolvedSlotProps?.className,
                        ),
                    };
                },
            }}
        />
    );
});

Select.propTypes = {
    className: PropTypes.string,
    /**
     * The props used for each slot inside the Input.
     * @default {}
     */
    slotProps: PropTypes.shape({
        listbox: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
        popup: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
        root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    }),
};