   M S B A M L   `   `   `  ����>  :WPF, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null3clr-namespace:WPF.UserControlsWPF.UserControls  5      $    WPF.UserControls.NumericUpDown   5      W SPresentationCore, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35\ XPresentationFramework, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35e aSystem.Windows.Controls.Ribbon, Version=8.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089R NWindowsBase, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35F 9http://schemas.microsoft.com/winfx/2006/xaml/presentation     5      R NSystem.Xaml, Version=8.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089:x,http://schemas.microsoft.com/winfx/2006/xaml     5      Jmc;http://schemas.openxmlformats.org/markup-compatibility/2006     5      @d2http://schemas.microsoft.com/expression/blend/2008     5      0localclr-namespace:WPF.UserControls     5      -   5          >�Name$  NumericUpDownObject��5      $��40��5      $��42��6.   .��5	      � 
������� � ColumnDefinitions 5
   
   �� 5      �� 5      $��20 �6   .+�5   
   �� -   5         ��Name$ txtNum��5      $��32(�5   3   $��0q�6A   $��Center=�6U   $��Center=�6w   $��Center=�6�   $��Center=�6�    �� TextAlignment$ Center=�6�   ��5      ��  �� Path$ NumValue� �� FallbackValue$ 0�� �� ElementName$ NumericUpDownObject�� �� Mode$ TwoWay=� �� UpdateSourceTrigger$ PropertyChanged=�5   �   � 5   
   $��1��6   	 � RowDefinitions	 5      �� 5      $	��30* �6    �� 5      $	��30* �6    .+�5      � 
�������.+�5      �� -   5        
 ��Name$
 cmdUp��5      $
��Auto��6V   $��18(�6�   $��	ExtraBold"�6�   ��6d   Z� ��6{   Z� .��6�   ▲6�   5      � 5      $��1��6   
�������.+�5       �� -   5        $
 cmdDown��5       $
��Auto��6Z   $��18(�6�   $��	ExtraBold"�6�   ��6h   Z� ��6   Z� .��6�   ▼6�   5!      5"      5#      5$      