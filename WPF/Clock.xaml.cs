using System.Text;
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

namespace WPF
{
    /// <summary>
    /// Interaction logic for Clock.xaml
    /// </summary>
    public partial class Clock : Window
    {
        private DispatcherTimer _timer;
        private bool _isTimeRunning;
        public Clock()
        {
            InitializeComponent();
            _timer = new DispatcherTimer();
            _timer.Interval = TimeSpan.FromSeconds(1);
            _timer.Tick += Timer_Tick;
        }

        private void SetTimeButton_Click(object sender, RoutedEventArgs e)
        {
            if (SetTimeButton.Content.ToString() == "Set Time")
            {
                HoursTextBox.IsEnabled = true;
                MinutesTextBox.IsEnabled = true;
                SecondsTextBox.IsEnabled = true;
                SetTimeButton.Content = "Start Time";
            }
            else if (SetTimeButton.Content.ToString() == "Start Time")
            {
                int hours = int.Parse(HoursTextBox.Text.PadLeft(2, '0'));
                int minutes = int.Parse(MinutesTextBox.Text.PadLeft(2, '0'));
                int seconds = int.Parse(SecondsTextBox.Text.PadLeft(2, '0'));

                DateTime now = DateTime.Now;
                DateTime setTime = new DateTime(now.Year, now.Month, now.Day, hours, minutes, seconds);
                DataContext = setTime;

                HoursTextBox.IsEnabled = false;
                MinutesTextBox.IsEnabled = false;
                SecondsTextBox.IsEnabled = false;
                SetTimeButton.Content = "(Re)Set Time";
                _timer.Start();
                _isTimeRunning = true;
            }
            else if (SetTimeButton.Content.ToString() == "(Re)Set Time")
            {
                _timer.Stop();
                HoursTextBox.IsEnabled = true;
                MinutesTextBox.IsEnabled = true;
                SecondsTextBox.IsEnabled = true;
                SetTimeButton.Content = "Start Time";
                _isTimeRunning = false;
            }
        }

        private void Timer_Tick(object sender, EventArgs e)
        {
            DateTime currentTime = (DateTime)DataContext;
            currentTime = currentTime.AddSeconds(1);
            DataContext = currentTime;
            ClockTextBlock.Text = currentTime.ToString("HH:mm:ss");
        }
    }
}
