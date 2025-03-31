using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;
namespace WPF.UserControls
{
    /// <summary>
    /// Interaction logic for NumericUpDown.xaml
    /// </summary>
    public partial class NumericUpDown : UserControl
    {
        private int _numValue = 0;
        private int _orginalWidth = 0;
        private int _maxValue = int.MaxValue;
        private int _minValue = 0;
        private double _addValue = 0;
        private double _totalValue = 0;

        public NumericUpDown()
        {
            InitializeComponent();
            _orginalWidth = (int)NumericUpDownObject.Width;
            txtNum.Text = _numValue.ToString();
        }

        // Dependency Property for NumValue
        public static readonly DependencyProperty NumValueProperty =
            DependencyProperty.Register("NumValue", typeof(int), typeof(NumericUpDown),
                new PropertyMetadata(0, OnNumValueChanged));

        // Dependency Property for MaxValue
        public static readonly DependencyProperty MaxValueProperty =
            DependencyProperty.Register("MaxValue", typeof(int), typeof(NumericUpDown),
                new PropertyMetadata(int.MaxValue, OnMaxValueChanged));

        // Dependency Property for MinValue
        public static readonly DependencyProperty MinValueProperty =
            DependencyProperty.Register("MinValue", typeof(int), typeof(NumericUpDown),
                new PropertyMetadata(0, OnMinValueChanged));

        public static readonly DependencyProperty AddValueProperty =
            DependencyProperty.Register("AddValue", typeof(double), typeof(NumericUpDown),
                new PropertyMetadata(0.0, OnAddValueChanged));

        public static readonly DependencyProperty TotalValueProperty =
            DependencyProperty.Register("TotalValue", typeof(double), typeof(NumericUpDown),
                new PropertyMetadata(0.0, OnTotalValueChanged));

        // Property wrappers
        public int NumValue
        {
            get { return (int)GetValue(NumValueProperty); }
            set { SetValue(NumValueProperty, value); }
        }

        public int MaxValue
        {
            get { return (int)GetValue(MaxValueProperty); }
            set { SetValue(MaxValueProperty, value); }
        }

        public int MinValue
        {
            get { return (int)GetValue(MinValueProperty); }
            set { SetValue(MinValueProperty, value); }
        }
        public double AddValue
        {
            get { return (double)GetValue(AddValueProperty); }
            set { SetValue(AddValueProperty, value); }
        }
        public double TotalValue
        {
            get { return (double)GetValue(TotalValueProperty); }
            set { SetValue(TotalValueProperty, value); }
        }

        // Property changed handlers
        private static void OnNumValueChanged(DependencyObject d, DependencyPropertyChangedEventArgs e)
        {
            if (d is NumericUpDown control)
            {
                control.UpdateNumValue((int)e.NewValue);
            }
        }

        private static void OnMaxValueChanged(DependencyObject d, DependencyPropertyChangedEventArgs e)
        {
            if (d is NumericUpDown control)
            {
                control._maxValue = (int)e.NewValue;
                control.ValidateValue();
            }
        }

        private static void OnMinValueChanged(DependencyObject d, DependencyPropertyChangedEventArgs e)
        {
            if (d is NumericUpDown control)
            {
                control._minValue = (int)e.NewValue;
                control.ValidateValue();
            }
        }
        private static void OnAddValueChanged(DependencyObject d, DependencyPropertyChangedEventArgs e)
        {
            if (d is NumericUpDown control)
            {
                control._addValue = (double)e.NewValue;
                control.ValidateValue();
            }
        }
        private static void OnTotalValueChanged(DependencyObject d, DependencyPropertyChangedEventArgs e)
        {
            if (d is NumericUpDown control)
            {
                control._totalValue = (double)e.NewValue;
            }
        }

        // Update and validate the numeric value
        private void UpdateNumValue(int value)
        {
            _numValue = value;
            _totalValue = _numValue * _addValue;
            TotalValue = _totalValue;
            ValidateValue();
            txtNum.Text = _numValue.ToString();
            AdjustTextBoxWidth();
        }

        // Ensure the value stays within min and max bounds
        private void ValidateValue()
        {
            if (_numValue > _maxValue)
            {
                _numValue = _maxValue;
                txtNum.Text = _numValue.ToString();
            }
            else if (_numValue < _minValue)
            {
                _numValue = _minValue;
                txtNum.Text = _numValue.ToString();
            }
        }

        private void CmdUp_Click(object sender, RoutedEventArgs e)
        {
            if (_numValue < _maxValue)
            {
                NumValue = _numValue + 1;
                _totalValue = _numValue * _addValue;
                TotalValue = _totalValue;
            }
        }

        private void CmdDown_Click(object sender, RoutedEventArgs e)
        {
            if (_numValue > _minValue)
            {
                NumValue = _numValue - 1;
                _totalValue = _numValue * _addValue;
                TotalValue = _totalValue;
            }
        }

        private void TxtNum_TextChanged(object sender, TextChangedEventArgs e)
        {
            if (txtNum == null)
            {
                return;
            }

            if (int.TryParse(txtNum.Text, out int parsedValue))
            {
                // Only update the backing field, not the property to avoid loops
                _numValue = parsedValue;
                ValidateValue();

                // If validation changed the value, update the text
                if (_numValue.ToString() != txtNum.Text)
                {
                    txtNum.Text = _numValue.ToString();
                }
            }
            else
            {
                txtNum.Text = _numValue.ToString();
            }

            AdjustTextBoxWidth();
        }

        private void AdjustTextBoxWidth()
        {
            var formattedText = new FormattedText(
                txtNum.Text,
                System.Globalization.CultureInfo.CurrentCulture,
                FlowDirection.LeftToRight,
                new Typeface(txtNum.FontFamily, txtNum.FontStyle, txtNum.FontWeight, txtNum.FontStretch),
                txtNum.FontSize,
                Brushes.Black,
                new NumberSubstitution(),
                1);
            double newWidth = formattedText.Width + 22;
            NumericUpDownObject.Width = newWidth > _orginalWidth ? newWidth : _orginalWidth;
        }
    }
}