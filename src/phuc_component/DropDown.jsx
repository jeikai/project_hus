import { useState } from "react"

const styles = {
    'dropDown':{
        'width': '100%',
        'height': '100vh',
        'position': 'relative',
    },
    'dropDown-btn':{
        'padding': '15px 20px',
        'background': '#fff',
        'box-shadow': '3px 3px 10px 6px rgba(0, 0, 0, 0.06)',
        'font-weight': 'bold',
        'color': '#333', 
        'display': 'flex',
        'align-items': 'center',
        'justify-content': 'space-between',
        'user-select': 'none'
    },
    'dropDown-content':{
        'position': 'absolute',
        'top': '8%',
        'padding': '15px',
        'background': '#fff',
        'box-shadow': '3px 3px 10px 6px rgba(0, 0, 0, 0.06)',
        'font-weight': '500',
        'color': '#333',
        'width': '82%',
        'z-index': '1'
    },
    'dropDown-item':{
        'padding': '10px',
        'cursor': 'pointr',
        'transition': 'all 0.2s',
        // 'z-index': '2',
    },
}


function DropDown () {
    const options = [
        {
            type: 'A - Z',
            function: ''
        },
        {
            type: 'Z - A',
            function: ''
        },
        {
            type: 'Mới nhất',
            function: ''
        },
        {
            type: 'Cũ nhất',
            function: ''
        },
    ]
    const [isActive, setIsActive] = useState(false)
    const [selected, setSelected] = useState(options[0].type)
    const handleSelect = (option) => {
        setSelected(option.type)
        setIsActive(false)
    }
    return(
        <div style={styles["dropDown"]}>
            <div style={styles["dropDown-btn"]}
                onClick={() => setIsActive(!isActive)}
            >
                {selected}
            </div>
            {isActive && (
            <div style={styles["dropDown-content"]}>
                {options.filter((option) => {
                    return option.type !== selected.type
                
                }).map((option, index) => {
                    return(
                        <div key={index} style={styles["dropDown-item"]}
                            onClick = {() => handleSelect(option)}
                        >
                            {option.type}
                        </div>
                    )
                })}
            </div>
            )}
        </div>
    )
}

export default DropDown