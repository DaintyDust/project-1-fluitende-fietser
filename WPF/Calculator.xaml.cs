using System;
using System.Collections.Generic;
using System.Globalization;
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
using System.Windows.Shapes;

namespace WPF
{
    public partial class Calculator : Window
    {
        private double currentValue = 0;
        private double storedValue = 0;
        private string currentOperation = string.Empty;
        private bool operationPressed = false;

        public Calculator()
        {
            InitializeComponent();
        }

        private void Button_Click(object sender, RoutedEventArgs e)
        {
            if (sender is Button button)
            {
                string buttonText = button.Content?.ToString() ?? string.Empty;

                if (double.TryParse(buttonText, out _))
                {
                    if (Display.Text == "0" || operationPressed)
                    {
                        Display.Text = buttonText;
                        operationPressed = false;
                    }
                    else
                    {
                        Display.Text += buttonText;
                    }

                    UpdateCurrentInput();
                }
                else
                {
                    switch (buttonText)
                    {
                        case "C":
                            Clear();
                            break;
                        case "⌫":
                            Backspace();
                            break;
                        case "+/-":
                            Negate();
                            break;
                        case "+":
                        case "-":
                        case "*":
                        case "/":
                            SetOperation(buttonText);
                            break;
                        case "=":
                            Calculate();
                            break;
                        case ".":
                            AddDecimal();
                            break;
                    }
                }
            }
        }

        private void Clear()
        {
            Display.Text = "0";
            CurrentInput.Text = string.Empty;
            currentValue = 0;
            storedValue = 0;
            currentOperation = string.Empty;
        }

        private void Backspace()
        {
            Display.Text = Display.Text.Length > 1
                ? Display.Text.Substring(0, Display.Text.Length - 1)
                : "0";
            UpdateCurrentInput();
        }

        private void Negate()
        {
            if (double.TryParse(Display.Text, NumberStyles.Any, CultureInfo.CurrentCulture, out currentValue))
            {
                currentValue = -currentValue;
                Display.Text = FormatResult(currentValue);
            }
            UpdateCurrentInput();
        }

        private void SetOperation(string operation)
        {
            if (!string.IsNullOrEmpty(currentOperation) && !operationPressed)
            {
                Calculate();
            }

            if (double.TryParse(Display.Text, NumberStyles.Any, CultureInfo.CurrentCulture, out currentValue))
            {
                storedValue = currentValue;
                currentOperation = operation;
                operationPressed = true;
                UpdateCurrentInput();
            }
        }

        private void Calculate()
        {
            if (string.IsNullOrEmpty(currentOperation) || operationPressed)
                return;

            if (double.TryParse(Display.Text, NumberStyles.Any, CultureInfo.CurrentCulture, out currentValue))
            {
                double result = currentOperation switch
                {
                    "+" => storedValue + currentValue,
                    "-" => storedValue - currentValue,
                    "*" => storedValue * currentValue,
                    "/" => currentValue != 0 ? storedValue / currentValue : throw new DivideByZeroException(),
                    _ => 0
                };

                CurrentInput.Text = $"{storedValue} {currentOperation} {currentValue} = {result}";
                Display.Text = FormatResult(result);
                storedValue = result;
                currentOperation = string.Empty;
                operationPressed = false;
            }
        }

        private void AddDecimal()
        {
            if (!Display.Text.Contains(CultureInfo.CurrentCulture.NumberFormat.NumberDecimalSeparator))
            {
                Display.Text += CultureInfo.CurrentCulture.NumberFormat.NumberDecimalSeparator;
            }
            UpdateCurrentInput();
        }

        private string FormatResult(double result)
        {
            return result.ToString("F4", CultureInfo.CurrentCulture); // Toon 4 decimalen
        }

        private void UpdateDisplay()
        {
            if (double.TryParse(Display.Text, NumberStyles.Any, CultureInfo.CurrentCulture, out double currentValue))
            {
                Display.Text = FormatResult(currentValue);
            }
        }

        private void UpdateCurrentInput()
        {
            if (string.IsNullOrEmpty(currentOperation))
            {
                CurrentInput.Text = Display.Text;
            }
            else
            {
                CurrentInput.Text = operationPressed
                    ? $"{storedValue} {currentOperation}"
                    : $"{storedValue} {currentOperation} {Display.Text}";
            }
        }
    }
}
