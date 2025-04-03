using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Data;
using System.Windows.Media;

namespace WPF.Converters
{
    class MoneyRetourConverter : IMultiValueConverter
    {
        public object Convert(object[] values, Type targetType, object parameter, CultureInfo culture)
        {
            if (values == null || values.Length < 2 || values[0] == null || values[1] == null)
                return "0:00.00";

            string firstValueStr = new string(values[0]?.ToString().Where(c => char.IsDigit(c) || c == ',').ToArray());
            string secondValueStr = new string(values[1]?.ToString().Where(c => char.IsDigit(c) || c == ',').ToArray());

            if (double.TryParse(firstValueStr, out double firstValue) && double.TryParse(secondValueStr, out double secondValue))
            {
                double result = secondValue - firstValue;
                return String.Format("{0:0.00}", result);
            }

            return "0:00.00";
        }

        public object[] ConvertBack(object value, Type[] targetTypes, object parameter, CultureInfo culture)
        {
            throw new NotImplementedException();
        }
    }
}
