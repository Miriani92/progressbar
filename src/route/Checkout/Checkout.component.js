import { Checkout as SourceCheckout } from "SourceRoute/Checkout/Checkout.component"
import ContentWrapper from 'SourceComponent/ContentWrapper/ContentWrapper.component';
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
    headerClass(activStepTitle, header, annulateHeader) {
        let className
        if (activStepTitle === header) {
            className = `header active`
        } else if (annulateHeader) {
            className = "lastheader"
        } else {
            className = "header"
        }
        return className

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
                    const className = this.headerClass(activStepTitle, header, annulateHeader)

                    return (
                        <div key={index} className={className} data-stepNumber={stepNumber}>{annulateHeader ? "" : header}</div>
                    )
                })}
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