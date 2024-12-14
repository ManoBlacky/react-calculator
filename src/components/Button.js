import { useContext } from "react";
import { CalcContext } from "../context/CalcContext";

const getStyleName = selectedbtn => {
    const className = {
        "=": "equal",
        "AC": "ac-btn",
        "/": "opt",
        "x": "opt",
        "-": "opt",
        "+": "opt",
    }
    return className[selectedbtn];
}

const Button = ({ value }) => {

    const { calc, setCalc } = useContext(CalcContext);


    // User Click ac
    const acClick = () => {
        setCalc({
            sign: '',
            num: 0,
            res: 0
        })

    }

    // User Click +/- (negative)
    const negative = () => {
        setCalc({
            num: calc.num > 0 ? calc.num * -1 : 0,
            res: calc.res > 0 ? calc.res * -1 : 0,
            sign: ''
        })
    }

    // User click dot
    const dotClick = () => {
        setCalc({
            ...calc,
            num: !calc.num.toString().includes('.') ? calc.num + value : calc.num
        })

    }

    // User click numbers
    const handleClickNumbers = () => {
        const numberString = value.toString()

        let numberValue;
        if (numberString === '0' && calc.num === 0) {
            numberValue = '0'
        } else {
            numberValue = Number(calc.num + numberString)
        }

        setCalc({
            ...calc,
            num: numberValue
        })
    }

    // User click operation
    const signClick = () => {
        setCalc({
            sign: value,
            res: !calc.res && calc.num ? calc.num : calc.res,
            num: 0
        })
    }

    // User click equal
    const equalClick = () => {
        if (calc.res && calc.num) {
            const math = (a, b, sign) => {
                const result = {
                    '+': (a, b) => a + b,
                    '-': (a, b) => a - b,
                    'x': (a, b) => a * b,
                    '/': (a, b) => a / b,
                }
                return result[sign](a, b);
            }

            setCalc({
                res: math(calc.res, calc.num, calc.sign),
                sign: '',
                num: 0
            })
        }
    }

    // User click persen
    const persenClick = () => {
        setCalc({
            num: (calc.num / 100),
            res: (calc.res / 100),
            sign: ''
        })
    }

    const handleBtnClick = () => {

        const result = {
            'AC': acClick,
            '+/-': negative,
            '/': signClick,
            'x': signClick,
            '-': signClick,
            '+': signClick,
            '.': dotClick,
            '=': equalClick,
            '%': persenClick,
        }

        if (result[value]) {
            return result[value];
        }
        else {
            return handleClickNumbers;
        }

    }

    return (
        <button onClick={handleBtnClick()} className={`${getStyleName(value)} button`}>{value}</button>
    );
}

export default Button;