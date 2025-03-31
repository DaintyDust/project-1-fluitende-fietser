using System;
using System.Globalization;
using System.Windows.Data;
using System.Windows.Media;


namespace WPF.Converters
{
    public class NumericValuesConverter : IMultiValueConverter
    {
        public object Convert(object[] values, Type targetType, object parameter, CultureInfo culture)
        {
            if (values == null || values.Length < 2 || values[0] == null || values[1] == null)
                return "0";


            double totalvalue = 0;

            foreach (var value in values)
            {
                if (double.TryParse(value.ToString(), out double intValue))
                {
                    totalvalue += intValue;
                }
            }

            return String.Format("{0:0.00}", totalvalue);
        }

        public object[] ConvertBack(object value, Type[] targetTypes, object parameter, CultureInfo culture)
        {
            throw new NotImplementedException();
        }
    }
}