import { defineComponent } from 'vue';

const ButtonGroup = defineComponent({
    props: {
        buttons: {
            type: Array,
            required: true
        },
        className: {
            type: String,
            required: false
        },
        small: {
            type: Boolean,
            required: false
        },
        onclick: {
            type: Function,
            required: false
        }
    },
    setup(props) {
        const handleClick = (callback) => {
            if (typeof callback === "function") {
                callback();
            }
        }

        const renderButtons = () => {
            return props.buttons.map((btn, index) => {
                return (
                    <div key={index}  class={props.className}>
                        <button
                            type={btn?.type || "button"}
                            onClick={() => { handleClick(btn?.onclick) }}
                            disabled={btn.disabled}
                            class={`
                                ${props.small ? " px-2 py-1 " : "px-4 py-2"}
                                text-sm font-medium
                                border border-gray-200
                                focus:z-10 focus:ring-2 focus:ring-transparent focus:text-blue-700
                                ${btn.className}`}>
                            {btn.label}
                        </button>
                    </div>
                )
            });
        }

        return () => (
            <div class={`flex "flex-row"`}>
                {renderButtons()}
            </div>
        )
    }
});

export default ButtonGroup;