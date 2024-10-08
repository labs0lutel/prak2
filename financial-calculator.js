class FinancialCalculator extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.render();
        this.handleEvents();
        console.log('Компонент создан.');
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    padding: 20px;
                }
                form {
                    background: white;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                    display: flex;
                    flex-direction: column;
                    max-width: 300px;
                    margin: 0 auto;
                }
                input {
                    margin-bottom: 10px;
                    padding: 10px;
                    font-size: 16px;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    transition: border 0.3s;
                }
                input:focus {
                    border-color: #007bff;
                    outline: none;
                }
                button {
                    padding: 10px;
                    font-size: 16px;
                    color: white;
                    background-color: #007bff;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    transition: background-color 0.3s;
                }
                button:hover {
                    background-color: #0056b3;
                }
                .result {
                    margin-top: 20px;
                    background: #e9ecef;
                    padding: 10px;
                    border-radius: 4px;
                }
                .result p {
                    margin: 5px 0;
                }
            </style>
            <form id="calculator-form">
                <input type="number" id="amount" placeholder="Сумма кредита" required />
                <input type="number" id="rate" placeholder="Процентная ставка" required />
                <input type="number" id="term" placeholder="Срок кредита (в месяцах)" required />
                <button type="submit">Рассчитать</button>
            </form>
            <div class="result">
                <p id="monthly-payment"></p>
                <p id="total-payment"></p>
                <p id="total-interest"></p>
            </div>
        `;
    }

    handleEvents() {
        this.shadowRoot.getElementById('calculator-form').addEventListener('submit', (event) => {
            event.preventDefault();
            this.calculate();
        });
    }

    calculate() {
        const amount = parseFloat(this.shadowRoot.getElementById('amount').value);
        const rate = parseFloat(this.shadowRoot.getElementById('rate').value) / 100 / 12;
        const term = parseInt(this.shadowRoot.getElementById('term').value);

        if (isNaN(amount) || isNaN(rate) || isNaN(term) || term <= 0) {
            alert('Введите корректные данные.');
            return;
        }

        const monthlyPayment = (amount * rate) / (1 - Math.pow((1 + rate), -term));
        const totalPayment = monthlyPayment * term;
        const totalInterest = totalPayment - amount;

        this.shadowRoot.getElementById('monthly-payment').innerText = `Ежемесячный платеж: ${monthlyPayment.toFixed(2)}₽`;
        this.shadowRoot.getElementById('total-payment').innerText = `Общая сумма: ${totalPayment.toFixed(2)}₽`;
        this.shadowRoot.getElementById('total-interest').innerText = `Общий процент: ${totalInterest.toFixed(2)}₽`;

        console.log('Данные обновлены.');
    }

    connectedCallback() {
        console.log('Компонент добавлен в DOM.');
    }

    disconnectedCallback() {
        console.log('Компонент удален из DOM.');
    }
}

customElements.define('financial-calculator', FinancialCalculator);
