using System.IO;
using System.Text;
using System.Text.RegularExpressions;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;
using System.Windows.Threading;
using WPF.UserControls;

namespace WPF
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {

        private Dictionary<string, string> euroBillsAndCoins = new Dictionary<string, string>
        {
            { "200", "Assets/200euro.jpg" },
            { "100", "Assets/100euro.jpg" },
            { "50", "Assets/50euro.png" },
            { "20", "Assets/20euro.jpg" },
            { "10", "Assets/10euro.png" },
            { "5", "Assets/5euro.png" },
            { "2", "Assets/2euro.png" },
            { "1", "Assets/1euro.png" },
            { "0,50", "Assets/50eurocent.png" },
            { "0,20", "Assets/20eurocent.png" },
            { "0,10", "Assets/10eurocent.png" },
            { "0,05", "Assets/5eurocent.png" }
        };
        private DispatcherTimer _timer = new DispatcherTimer();
        private TimeSpan _time;
        public MainWindow()
        {
            InitializeComponent();
            LoadComboBoxes();
            InitializeProgressBarTimer();
        }

        private void InitializeProgressBarTimer()
        {
            _time = TimeSpan.FromMinutes(1); 
            ProgressBar.Maximum = _time.TotalSeconds;
            ProgressBar.Value = _time.TotalSeconds;

            _timer.Interval = TimeSpan.FromSeconds(1);
            _timer.Tick += Timer_Tick;
            _timer.Start();

            this.AddHandler(UIElement.MouseDownEvent, new RoutedEventHandler(ResetTimer), true);
        }

        private void Timer_Tick(object sender, EventArgs e)
        {
            if (_time.TotalSeconds > 0)
            {
                _time = _time.Subtract(TimeSpan.FromSeconds(1));
                ProgressBar.Value = _time.TotalSeconds;
            }
            else
            {
                _timer.Stop();
                Application.Current.Shutdown();
            }
        }

        private void ResetTimer(object sender, RoutedEventArgs e)
        {
            _time = TimeSpan.FromSeconds(60);
            ProgressBar.Value = _time.TotalSeconds;
        }

        private void LoadComboBoxes()
        {
            string path = "Assets/prijzen_fietsen_verzekeringen_services.csv";
            StreamReader reader = null;

            if (File.Exists(path))
            {
                reader = new StreamReader(File.OpenRead(path));

                while (!reader.EndOfStream)
                {
                    var line = reader.ReadLine().Replace("\"", "");
                    var values = line.Split(';');

                    if (values[0] == "Fietsen")
                    {
                        FietsenCombobox.Items.Add($"{values[1]}\n{values[2]}");
                    }
                    else if (values[0] == "Verzekeringen")
                    {
                        VerzekeringComboBox.Items.Add($"{values[1]}\n{values[2]}");
                    }
                    else if (values[0] == "Services")
                    {
                        ServicesComboBox.Items.Add($"{values[1]}\n{values[2]}");


                    }
                }
            }
            else
            {
                Console.WriteLine("File not found");
            }
        }

        private void ClearNumeric()
        {
            FietsenNumeric.NumValue = 0;
            ServicesNumeric.NumValue = 0;
            VerzekeringNumeric.NumValue = 0;    
        }
        private void ClearComboBoxes()
        {
            FietsenCombobox.SelectedIndex = -1;
            ServicesComboBox.SelectedIndex = -1;
            VerzekeringComboBox.SelectedIndex = -1;
        }

        private void OrderChangedComboBox(object sender, SelectionChangedEventArgs e)
        {
            if (sender is ComboBox comboBox)
            {
                int OldSelectedIndex = comboBox.SelectedIndex;

                FietsenCombobox.SelectionChanged -= OrderChangedComboBox;
                ServicesComboBox.SelectionChanged -= OrderChangedComboBox;
                VerzekeringComboBox.SelectionChanged -= OrderChangedComboBox;

                ClearComboBoxes();
                ClearNumeric();
                comboBox.SelectedIndex = OldSelectedIndex;

                FietsenCombobox.SelectionChanged += OrderChangedComboBox;
                ServicesComboBox.SelectionChanged += OrderChangedComboBox;
                VerzekeringComboBox.SelectionChanged += OrderChangedComboBox;
            }
        }

        private void OrderButton_Click(object sender, RoutedEventArgs e)
        {
            if (FietsenCombobox.SelectedIndex == -1 && ServicesComboBox.SelectedIndex == -1 && VerzekeringComboBox.SelectedIndex == -1)
            {
                MessageBox.Show("Selecteer een item");
                return;
            }
            if (FietsenNumeric.NumValue == 0 && ServicesNumeric.NumValue == 0 && VerzekeringNumeric.NumValue == 0)
            {
                MessageBox.Show("Voer een aantal producten in");
                return;
            }

            if (FietsenCombobox.SelectedIndex != -1)
            {
                AddToOrderList(FietsenCombobox, FietsenNumeric);
            }
            else if (ServicesComboBox.SelectedIndex != -1)
            {
                AddToOrderList(ServicesComboBox, ServicesNumeric);
            }
            else if (VerzekeringComboBox.SelectedIndex != -1)
            {
                AddToOrderList(VerzekeringComboBox, VerzekeringNumeric);
            }
        }

        private void DeleteItemBtn_Click(object sender, RoutedEventArgs e)
        {
            MessageBoxResult result = MessageBox.Show("Weet je zeker dat je dit product wil verwijderen?", "Verwijder", MessageBoxButton.YesNo, MessageBoxImage.Question);
            if (result == MessageBoxResult.Yes)
            {
                Button button = (Button)sender;
                StackPanel stackPanel = (StackPanel)button.Parent;
                OrdersListBox.Items.Remove(stackPanel);
                UpdateTotalPrice();
                UpdateRetour();
            }
        }

        private void AddToOrderList(ComboBox comboBox, NumericUpDown numericUpDown)
        {
            StackPanel stackPanel = new StackPanel();
            stackPanel.Orientation = Orientation.Horizontal;
            stackPanel.Margin = new Thickness(5);

            stackPanel.Resources = new ResourceDictionary();
            Style textBlockStyle = new Style(typeof(TextBlock));
            textBlockStyle.Setters.Add(new Setter(TextBlock.MarginProperty, new Thickness(0, 0, 10, 0)));
            stackPanel.Resources.Add(typeof(TextBlock), textBlockStyle);  

            TextBlock productname = new TextBlock();
            productname.Text = comboBox.SelectedItem.ToString().Split('\n')[0];
            productname.Margin = new Thickness(5);

            TextBlock priceperday = new TextBlock();
            priceperday.Text = $"€ {(Regex.Match(comboBox.SelectedItem.ToString(), @"\d+(\.\d+)?").Value).Replace(".",",")}";
            priceperday.Margin = new Thickness(5);

            TextBlock daysamount = new TextBlock();
            daysamount.Text = $"x {numericUpDown.NumValue}";
            daysamount.Margin = new Thickness(5);

            TextBlock totalPrice = new TextBlock();
            string onlynum = (Regex.Match(comboBox.SelectedItem.ToString(), @"\d+(\.\d+)?").Value).Replace(".", ",");
            double totalPriceAmount = Convert.ToDouble(onlynum);
            totalPrice.Text = $"= € {numericUpDown.NumValue * totalPriceAmount:F2}";
            totalPrice.Margin = new Thickness(5);

            Button deleteItemBtn = new Button();
            deleteItemBtn.Content = "X";
            deleteItemBtn.Click += DeleteItemBtn_Click;
            deleteItemBtn.Margin = new Thickness(5);

            stackPanel.Children.Add(productname);
            stackPanel.Children.Add(priceperday);
            stackPanel.Children.Add(daysamount);
            stackPanel.Children.Add(totalPrice);
            stackPanel.Children.Add(deleteItemBtn);
            OrdersListBox.Items.Add(stackPanel);

            UpdateTotalPrice();
            UpdateRetour();
            ClearComboBoxes();
            ClearNumeric();
        }

        private void ClearOrderList()
        {
            OrdersListBox.Items.Clear();
            UpdateTotalPrice();
            UpdateRetour();
        }
        private void ResetAllNumericUpDowns()
        {
            foreach (var control in MoneyGrid.Children)
            {
                if (control is Grid grid)
                {
                    foreach (var child in grid.Children)
                    {
                        if (child is NumericUpDown numericUpDown)
                        {
                            numericUpDown.NumValue = 0;
                        }
                    }
                }
                else
                if (control is NumericUpDown numericUpDown)
                {
                    numericUpDown.NumValue = 0;
                }
            }
        }

        private void UpdateTotalPrice()
        {
            double totalPrice = 0;
            foreach (var item in OrdersListBox.Items)
            {
                StackPanel stackPanel = (StackPanel)item;
                TextBlock totalPriceTextBlock = (TextBlock)stackPanel.Children[3];
                string totalPriceText = totalPriceTextBlock.Text.Replace("= € ", "");
                double itemTotalPrice = Convert.ToDouble(totalPriceText);
                totalPrice += itemTotalPrice;
            }
            TotalPrice.Content = $"Totaalprijs = € {totalPrice:F2}";
        }

        private void UpdateRetour()
        {
            double totalPrice = Convert.ToDouble(TotalPrice.Content.ToString().Replace("Totaalprijs = € ", "")); //Convert.ToDouble(TotalPrice.Content.ToString().Split("€ ")[1]); 
            double totalGiven = Convert.ToDouble(TotalGiven.Content.ToString().Replace("€ ", ""));
            double totalBack = totalGiven - totalPrice;

            MoneyRetour.Children.Clear();
            foreach (var bill in euroBillsAndCoins.OrderByDescending(bill => Convert.ToDouble(Regex.Match(bill.Key, @"\d+(\.\d+)?").Value)))
            {
                string billnumber = Regex.Match(bill.Key.Replace(",", "."), @"\d+(\.\d+)?").Value.Replace(".", ",");
                double billValue = Convert.ToDouble(billnumber);
                int billCount = (int)(totalBack / billValue);
                totalBack -= billCount * billValue;

                for (int i = 0; i < billCount; i++)
                {
                    Image billImage = new Image();
                    billImage.Source = new BitmapImage(new Uri(bill.Value, UriKind.Relative));
                    billImage.Width = Convert.ToDouble(bill.Key) < 5 ? 25 : 50;
                    billImage.Height = 25;
                    billImage.Margin = new Thickness(0, 0, 5, 0);
                    MoneyRetour.Children.Add(billImage);
                }
            }
        }

     

        private void Open_Calculator(object sender, RoutedEventArgs e)
        {
            Calculator calculator = new Calculator();
            calculator.Show();
        }

        private void CancelOrder(object sender, RoutedEventArgs e)
        {
            ClearOrderList();
        }

        private void Numeric_ValueChanged(object sender, RoutedEventArgs e)
        {
            UpdateRetour();
        }


        private void Open_Timer(object sender, RoutedEventArgs e)
        {
           Clock clock = new Clock();
           clock.Show();
        }

        private void NextCustomer(object sender, RoutedEventArgs e)
        {
            if (OrdersListBox.Items.Count == 0)
            {
                MessageBox.Show("Je hebt geen bestelling geplaatst");
                return;
            }
            else
            {
                MessageBoxResult result = MessageBox.Show("Heb je de bestelling betaald?", "Betalen", MessageBoxButton.YesNo, MessageBoxImage.Question);
                if (result == MessageBoxResult.Yes)
                {
                    if (double.TryParse(TotalBack.Content.ToString(), out double totalBack) && totalBack >= 0)
                    {
                        ClearOrderList();
                        ResetAllNumericUpDowns();
                    }
                    else
                    {
                        MessageBox.Show("Je hebt nog niet genoeg geld betaald!");
                    }
                }
            }
        }
    }
}