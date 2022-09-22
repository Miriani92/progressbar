import { Checkout as SourceCheckout } from "SourceRoute/Checkout/Checkout.component"
import "./Checkout.extension.style"


class Checkout extends SourceCheckout {


    createStepHeadersArr(stepMap) {
        let headersArray = []
        for (const key in stepMap) {
            const header = stepMap[key].title.value.replace("step", "")
            headersArray.push(header)
        }
        return headersArray

    }

    renderTitle() {
        const { checkoutStep } = this.props;

        const { title = '' } = this.stepMap[checkoutStep]
        const activStepTitle = title.value.replace("step", "")

        const stepHeaders = this.createStepHeadersArr(this.stepMap)

        return (
            <div className="progressBarWrapper">
                {stepHeaders.map((header, index) => {
                    let stepNumber = index + 1
                    let annulateHeader = stepNumber === stepHeaders.length

                    return (
                        <div key={index} className={activStepTitle === header && "active"} data-stepNumber={stepNumber}>{annulateHeader ? "" : header}</div>
                    )
                })}
            </div>
        );

    }
}

export default Checkout