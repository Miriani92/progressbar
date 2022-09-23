import { Checkout as SourceCheckout } from "SourceRoute/Checkout/Checkout.component"
import ContentWrapper from 'SourceComponent/ContentWrapper/ContentWrapper.component';
import checkIcon from "../../assets/check.svg"
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
    headerClass(activStepTitle, stepHeaders, index) {
        let matchIndex = stepHeaders.findIndex((item) => item === activStepTitle)
        let isActive = false
        let isCheckIcon = false
        if (matchIndex !== -1 && matchIndex === index || matchIndex > index) {
            isActive = true
        }
        if (matchIndex !== -1 && matchIndex > index) {
            isCheckIcon = true
        }
        return { isActive, isCheckIcon }
    }


    renderTitle() {
        const { checkoutStep } = this.props;

        const { title = '' } = this.stepMap[checkoutStep]

        const activStepTitle = title.value.replace("step", "")
        const stepHeaders = this.createStepHeadersArr(this.stepMap)

        return (
            <div className="porgressBarWrapper">
                <div className="porgressBar">
                    {stepHeaders.map((header, index) => {
                        let stepNumber = index + 1
                        const isLastHeader = stepHeaders.length === stepNumber
                        const { isActive, isCheckIcon } = this.headerClass(activStepTitle, stepHeaders, index)

                        return (

                            <div key={index} className={isActive ? `list active` : "list"} data-stepNumber={stepNumber}>


                                <div className={isLastHeader ? "noStepInfo" : "stepInfo"}>
                                    <span className={isActive ? `header activeHeader` : "header"}> {header}</span>
                                    <span className={isActive ? `stepNumber activeStepNumber` : "stepNumber"}>
                                        {isCheckIcon ? <img src={checkIcon} className="svgstyle"></img> : stepNumber}
                                    </span>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        );

    }



    render() {
        return (
            <main block="Checkout">
                {this.renderTitle()}
                <ContentWrapper
                    wrapperMix={{ block: 'Checkout', elem: 'Wrapper' }}
                    label={__('Checkout page')}
                >
                    {this.renderSummary(true)}
                    <div block="Checkout" elem="Step">
                        {this.renderGuestForm()}
                        {this.renderStep()}
                        {this.renderLoader()}
                    </div>
                    <div>
                        {this.renderSummary()}
                        {this.renderPromo()}
                        {this.renderCoupon()}
                    </div>
                </ContentWrapper>
            </main>
        );
    }
}

export default Checkout