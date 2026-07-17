/**
 * CommerceCraft Currency Formatting Utility
 */

/**
 * Format numeric values into responsive currency locale outputs
 * @param amount Numeric value to format
 * @param currency Currency code (defaults to 'USD')
 * @param locale Regional locale string (defaults to 'en-US')
 */
export const formatCurrency = (
    amount: number | string,
    currency = 'USD',
    locale = 'en-US'
): string => {
    const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;

    if (isNaN(numericAmount)) {
        return '';
    }

    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(numericAmount);
};

export default formatCurrency;
