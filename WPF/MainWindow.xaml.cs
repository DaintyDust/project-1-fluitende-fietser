using System.IO;
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

namespace WPF
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
            LoadComboBoxes();
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


        private void OrderButton_Click(object sender, RoutedEventArgs e)
        {

        }
    }
}