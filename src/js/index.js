import '../scss/style.scss';

window.addEventListener('DOMContentLoaded', () => {

    const inputs = document.querySelectorAll('input'),
        costInput = document.querySelector('#cost-input'),
        contributionInput = document.querySelector('#contribution-input'),
        anchorsBtnWrap = document.querySelector('.anchors'),
        anchorsBtn = document.querySelectorAll('.anchors__btn'),
        creditTermtInput = document.querySelector('.credit-input'),
        rateInput = document.querySelector('.rate-input'),
        monthlyPayment = document.querySelector('#monthly-payment'),
        overpaymentOutPut = document.querySelector('#overpayment'),
        necessaryIncomeOutPut = document.querySelector('#necessary-income'),
        credit = document.querySelector('#credit'),
        buttonsSave = document.querySelector('.interaction-buttons__save'),
        buttonsClear = document.querySelector('.interaction-buttons__clear');

    costInput.addEventListener('input', calcLoanPrincipal);
    contributionInput.addEventListener('input', calcLoanPrincipal);
    creditTermtInput.addEventListener('input', calcRateInputValue);
    rateInput.addEventListener('input', calcRateInputValue);
    buttonsClear.addEventListener('click', clearInputValue);


    function getMaskedValue(val) {
        return val.toString().replace(/[^\d]/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }

    function deleteSpace(val) {
        return val.toString().split(' ').join('');
    }

    function inputValueCorrection() {
        inputs.forEach(event => {
            event.addEventListener('input', (e) => {
                e.target.value = getMaskedValue(e.target.value)
            });
        })
    }
    inputValueCorrection();

    function calcLoanPrincipal() {
        fun();
        let arrWithValueInputCost = [];
        let arrWithValueInputContribution = [];
        let currentCostInpValue = costInput.value;
        let currentContributionInputValue = contributionInput.value;
        arrWithValueInputCost.push(currentCostInpValue);
        arrWithValueInputContribution.push(currentContributionInputValue);
        let varWithStringValueCost = '';
        let varWithStringValueContribution = '';

        for (let i = 0; i < arrWithValueInputCost.length; i++) {
            for (let j = 0; j < arrWithValueInputContribution.length; j++) {
                varWithStringValueContribution = deleteSpace(arrWithValueInputContribution[j]);
            }
            varWithStringValueCost = deleteSpace(arrWithValueInputCost[i]);
        }

        let result = varWithStringValueCost - varWithStringValueContribution;

        credit.innerText = getMaskedValue(result);

        calcPercent(varWithStringValueCost);
        calcOverpayment(currentCostInpValue, currentContributionInputValue);
        calcRateInputValue();
    }

    function addClassActive() {
        anchorsBtn.forEach(event => {
            event.addEventListener('click', () => {
                anchorsBtnWrap.querySelector('.active').classList.remove('active');
                event.classList.add('active');
            })
        });
    }

    addClassActive();

    function calcPercent(currentCostInpValue) {
        anchorsBtn.forEach((event) => {
            event.addEventListener('click', e => {

                if (!costInput.value) {
                    contributionInput.value = null;
                } else {
                    const splitByNumber = e.target.innerText;
                    const reverseNumber = parseInt(splitByNumber) / 100;
                    let total = currentCostInpValue * reverseNumber;
                    contributionInput.value = getMaskedValue(Math.round(total));
                    let resultCalc = currentCostInpValue - total;
                    credit.innerText = getMaskedValue(Math.round(resultCalc));
                    calcRateInputValue();
                }
            });
        })
    }

    function calcRateInputValue() {
        let rateInputValue = rateInput.value;
        let loanPrincipalValue = deleteSpace(credit.innerHTML);
        let creditTerm = creditTermtInput.value;
        calcMonthlyPayment(loanPrincipalValue, rateInputValue, creditTerm);
    }

    function calcMonthlyPayment(c, i, n) {
        let calcRate = i / 1200;
        let numberOfMonthly = n * 12;
        let powValue = Math.pow(1 + calcRate, numberOfMonthly) - 1;
        let divideInteresRate = calcRate / powValue;
        let addition = calcRate + divideInteresRate;
        let sum = (c * addition).toFixed(0);
        monthlyPayment.innerText = getMaskedValue(sum);
        calcNecessaryIncome(sum, numberOfMonthly);
    }

    function calcNecessaryIncome(p, n) {
        let overpaymentValue = (5 * p / 3).toFixed(0);
        necessaryIncomeOutPut.innerText = getMaskedValue(overpaymentValue);
        calcOverpayment(p, n);
    }

    const calcOverpayment = (p, n) => {
        let costValue = deleteSpace(costInput.value);
        let contributionValue = deleteSpace(contributionInput.value);
        let sumOverpayment = p * n - Number(costValue) + Number(contributionValue);
        overpaymentOutPut.innerText = getMaskedValue(sumOverpayment);
 
    }
    const fun = () => {
        let costVal =  deleteSpace(costInput.value);
        let contributionVal = deleteSpace(contributionInput.value);
        let numCost = +costVal;
        let numContribution = +contributionVal;

        if(numCost < numContribution) {
            costInput.value = '';
            contributionInput.value = '';
        }
    }


    function clearInputValue() {
        costInput.value = '';
        contributionInput.value = '';
        creditTermtInput.value = '';
        rateInput.value = '';
        overpaymentOutPut.innerText = '';
        necessaryIncomeOutPut.innerText = '';
        credit.innerText = '';
        monthlyPayment.innerText = '';
    }

});

//TODO: сохраненить данные в localStorage
