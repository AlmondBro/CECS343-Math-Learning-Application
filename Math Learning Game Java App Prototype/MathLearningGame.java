import javax.swing.JFrame;
import javax.swing.JPanel;
import java.awt.BorderLayout;
import java.awt.Font;
import java.util.*;
import javax.swing.JLabel;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.net.URL;
import java.util.ArrayList;
import javax.swing.JRadioButton;
import javax.swing.JTextField;
import javax.swing.SwingConstants;
import javax.swing.SwingUtilities;
import javax.swing.UIManager;
import javax.swing.ButtonGroup;
import javax.swing.ImageIcon;
import javax.swing.JButton;

public class MathLearningGame implements ActionListener
{
	/**
	 * 
	 */
	private Timer timer;
	/**
	 * 
	 */
	private ArrayList<JRadioButton> radioButtonList;
	/**
	 * 
	 */
	private ButtonGroup radioButtonGroup;
	/**
	 * 
	 */
	private JTextField answerTextField;
	/**
	 * 
	 */
	private JFrame game;
	/**
	 * 
	 */
	private JPanel gamePanel;
	/**
	 * 
	 */
	private JPanel menuControlPanel;
	/**
	 * 
	 */
	private JPanel afterGameWinOrLosePanel;
	/**
	 * 
	 */
	private JLabel mathGifLabel;
	/**
	 * 
	 */
	private JLabel roundYourAnswerLabel;
	/**
	 * 
	 */
	private JLabel mainMenuLabel;
	/**
	 * 
	 */
	private JLabel equationLabel;
	/**
	 * 
	 */
	private JLabel currentLevelLabel;
	/**
	 * 
	 */
	private JLabel timeLeftLabel;
	/**
	 * 
	 */
	private JLabel goalPointsLabel;
	/**
	 * 
	 */
	private JLabel mathTypeLabel;
	/**
	 * 
	 */
	private JLabel currentPointsLabel;
	/**
	 * 
	 */
	private JLabel goalPointsAfterGameLabel;
	/**
	 * 
	 */
	private JLabel currentPointsAfterGameLabel;
	/**
	 * 
	 */
	private JLabel winOrLoseLabel;
	/**
	 * 
	 */
	private JButton submitButton;
	/**
	 * 
	 */
	private JButton quitButton;
	/**
	 * 
	 */
	private JButton levelOneButton;
	/**
	 * 
	 */
	private JButton levelTwoButton;
	/**
	 * 
	 */
	private JButton levelThreeButton;
	/**
	 * 
	 */
	private JButton levelFourButton;
	/**
	 * 
	 */
	private JButton levelFiveButton;
	/**
	 * 
	 */
	private JButton levelSixButton;
	/**
	 * 
	 */
	private JButton backToMainMenuButton;
	/**
	 * 
	 */
	private JRadioButton additionRadioButton;
	/**
	 * 
	 */
	private JRadioButton subtractionRadioButton;
	/**
	 * 
	 */
	private JRadioButton multiplicationRadioButton;
	/**
	 * 
	 */
	private JRadioButton divisionRadioButton;
	/**
	 * 
	 */
	private String currentEquation;
	/**
	 * 
	 */
	private String mathType;
	/**
	 * 
	 */
	private int currentPoints;
	/**
	 * 
	 */
	private int goalPoints;
	/**
	 * 
	 */
	private int timeLeft;
	/**
	 * 
	 */
	private int currentLevel;

	/**
	 * 
	 */
	public MathLearningGame()
	{
		SwingUtilities.invokeLater(new Runnable()
		{
			@Override
			public void run()
			{
				try
				{
					UIManager.setLookAndFeel(UIManager.getSystemLookAndFeelClassName());
				} catch (Exception e)
				{
					e.printStackTrace();
				}
				initializeGUI();
			}
		});
	}

	/**
	 * 
	 */
	public void initializeGUI()
	{
		createLabels();
		createButtons();
		createRadioButtonsAndButtonGroup();
		createTextFields();
		createPanels();
		createFrame();
		displayMenu();
	}

	/**
	 * 
	 */
	public void createFrame()
	{
		game = new JFrame();
		game.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		game.setBounds(100, 100, 800, 600);
		game.setResizable(false);
		game.setTitle("Math Game for Kids");
		game.getContentPane().add(afterGameWinOrLosePanel);
		game.getContentPane().add(gamePanel);
		game.getContentPane().add(menuControlPanel, BorderLayout.CENTER);
		game.getRootPane().setDefaultButton(submitButton);
		game.setVisible(true);
	}

	/**
	 * 
	 */
	public void createLabels()
	{/*
		URL mathGif = this.getClass().getResource("math gif1.gif");
		ImageIcon myGifIcon = new ImageIcon(mathGif);
		mathGifLabel = new JLabel(myGifIcon);
		mathGifLabel.setBounds(0, 0, 800, 600); */

		currentLevelLabel = new JLabel("Level: ");
		currentLevelLabel.setBounds(33, 24, 106, 68);
		currentLevelLabel.setFont(new Font(currentLevelLabel.getName(), Font.PLAIN, 20));

		timeLeftLabel = new JLabel("Time left: ");
		timeLeftLabel.setBounds(296, 24, 184, 52);
		timeLeftLabel.setFont(new Font(timeLeftLabel.getName(), Font.PLAIN, 20));

		goalPointsLabel = new JLabel("Goal Points: ");
		goalPointsLabel.setBounds(107, 105, 177, 52);
		goalPointsLabel.setFont(new Font(goalPointsLabel.getName(), Font.PLAIN, 20));

		mathTypeLabel = new JLabel("Type: " + mathType);
		mathTypeLabel.setBounds(541, 24, 229, 52);
		mathTypeLabel.setFont(new Font(mathTypeLabel.getName(), Font.PLAIN, 20));

		currentPointsLabel = new JLabel("Current points: ");
		currentPointsLabel.setBounds(494, 89, 234, 68);
		currentPointsLabel.setFont(new Font(currentPointsLabel.getName(), Font.PLAIN, 20));

		mainMenuLabel = new JLabel("Main Menu");
		mainMenuLabel.setBounds(357, 50, 62, 16);

		equationLabel = new JLabel("");
		equationLabel.setBounds(170, 297, 200, 72);
		equationLabel.setFont(new Font(equationLabel.getName(), Font.PLAIN, 28));
		equationLabel.setHorizontalAlignment(SwingConstants.CENTER);
		equationLabel.setVerticalAlignment(SwingConstants.CENTER);

		roundYourAnswerLabel = new JLabel("Round your answer to two decimal places if necessary!");
		roundYourAnswerLabel.setBounds(198, 270, 356, 16);
		roundYourAnswerLabel.setVisible(false);

		goalPointsAfterGameLabel = new JLabel("");
		goalPointsAfterGameLabel.setBounds(105, 310, 613, 100);
		goalPointsAfterGameLabel.setFont(new Font(goalPointsAfterGameLabel.getName(), Font.BOLD, 30));
		goalPointsAfterGameLabel.setHorizontalAlignment(SwingConstants.CENTER);

		currentPointsAfterGameLabel = new JLabel("");
		currentPointsAfterGameLabel.setBounds(105, 208, 613, 100);
		currentPointsAfterGameLabel.setFont(new Font(currentPointsAfterGameLabel.getName(), Font.BOLD, 30));
		currentPointsAfterGameLabel.setHorizontalAlignment(SwingConstants.CENTER);

		winOrLoseLabel = new JLabel("");
		winOrLoseLabel.setBounds(139, 13, 466, 149);
		winOrLoseLabel.setFont(new Font(winOrLoseLabel.getName(), Font.BOLD, 40));
		winOrLoseLabel.setHorizontalAlignment(SwingConstants.CENTER);

	}

	/**
	 * 
	 */
	public void createButtons()
	{
		submitButton = new JButton("Submit answer");
		submitButton.setBounds(550, 300, 126, 72);
		submitButton.addActionListener(this);

		quitButton = new JButton("Quit");
		quitButton.setBounds(30, 500, 97, 25);
		quitButton.addActionListener(this);

		backToMainMenuButton = new JButton("Main Menu");
		backToMainMenuButton.setBounds(268, 471, 200, 74);
		backToMainMenuButton.addActionListener(this);

		levelOneButton = new JButton("Level 1");
		levelOneButton.addActionListener(this);
		levelOneButton.setBounds(339, 160, 97, 25);

		levelTwoButton = new JButton("Level 2");
		levelTwoButton.setBounds(339, 210, 97, 25);
		levelTwoButton.addActionListener(this);

		levelThreeButton = new JButton("Level 3");
		levelThreeButton.setBounds(339, 260, 97, 25);
		levelThreeButton.addActionListener(this);

		levelFourButton = new JButton("Level 4");
		levelFourButton.setBounds(339, 310, 97, 25);
		levelFourButton.addActionListener(this);

		levelFiveButton = new JButton("Level 5");
		levelFiveButton.setBounds(339, 360, 97, 25);
		levelFiveButton.addActionListener(this);

		levelSixButton = new JButton("Level 6");
		levelSixButton.setBounds(339, 410, 97, 25);
		levelSixButton.addActionListener(this);
	}

	/**
	 * 
	 */
	public void createRadioButtonsAndButtonGroup()
	{
		radioButtonList = new ArrayList<JRadioButton>();
		additionRadioButton = new JRadioButton("Addition");
		radioButtonList.add(additionRadioButton);
		additionRadioButton.addActionListener(this);
		additionRadioButton.setBounds(42, 99, 127, 25);

		subtractionRadioButton = new JRadioButton("Subtraction");
		radioButtonList.add(subtractionRadioButton);
		subtractionRadioButton.addActionListener(this);
		subtractionRadioButton.setBounds(225, 99, 127, 25);

		multiplicationRadioButton = new JRadioButton("Multiplication");
		multiplicationRadioButton.setBounds(410, 99, 127, 25);
		radioButtonList.add(multiplicationRadioButton);
		multiplicationRadioButton.addActionListener(this);

		divisionRadioButton = new JRadioButton("Division");
		divisionRadioButton.setBounds(600, 99, 127, 25);
		radioButtonList.add(divisionRadioButton);
		divisionRadioButton.addActionListener(this);

		radioButtonGroup = new ButtonGroup();
		radioButtonGroup.add(additionRadioButton);
		radioButtonGroup.add(subtractionRadioButton);
		radioButtonGroup.add(multiplicationRadioButton);
		radioButtonGroup.add(divisionRadioButton);
	}

	/**
	 * 
	 */
	public void createTextFields()
	{
		answerTextField = new JTextField();
		answerTextField.setBounds(400, 300, 116, 72);
		answerTextField.setFont(new Font(answerTextField.getName(), Font.PLAIN, 28));
		answerTextField.setHorizontalAlignment(SwingConstants.CENTER);
		answerTextField.setColumns(10);
	}

	/**
	 * 
	 */
	public void createPanels()
	{
		gamePanel = new JPanel();
		gamePanel.setBounds(0, 0, 800, 600);
		gamePanel.setLayout(null);
		gamePanel.add(answerTextField);
		gamePanel.add(equationLabel);
		gamePanel.add(submitButton);
		gamePanel.add(quitButton);
		gamePanel.add(roundYourAnswerLabel);
		gamePanel.add(currentLevelLabel);
		gamePanel.add(timeLeftLabel);
		gamePanel.add(goalPointsLabel);
		gamePanel.add(mathTypeLabel);
		gamePanel.add(currentPointsLabel);

		menuControlPanel = new JPanel();
		menuControlPanel.setLayout(null);
		menuControlPanel.add(mainMenuLabel);
		menuControlPanel.add(additionRadioButton);
		menuControlPanel.add(subtractionRadioButton);
		menuControlPanel.add(multiplicationRadioButton);
		menuControlPanel.add(divisionRadioButton);
		menuControlPanel.add(levelOneButton);
		menuControlPanel.add(levelTwoButton);
		menuControlPanel.add(levelThreeButton);
		menuControlPanel.add(levelFourButton);
		menuControlPanel.add(levelFiveButton);
		menuControlPanel.add(levelSixButton);
		//menuControlPanel.add(mathGifLabel);

		afterGameWinOrLosePanel = new JPanel();
		afterGameWinOrLosePanel.setBounds(0, 0, 782, 582);
		afterGameWinOrLosePanel.setLayout(null);
		afterGameWinOrLosePanel.add(backToMainMenuButton);
		afterGameWinOrLosePanel.add(currentPointsAfterGameLabel);
		afterGameWinOrLosePanel.add(goalPointsAfterGameLabel);
		afterGameWinOrLosePanel.add(winOrLoseLabel);

	}

	/**
	 * @param level
	 * @param type
	 */
	public void displayGame(int level, String type)
	{
		menuControlPanel.setVisible(false);
		mainMenuLabel.setVisible(false);
		gamePanel.setVisible(true);
		displayDivisionTip();
		currentLevelLabel.setText("Level: " + level);
		mathTypeLabel.setText("Math type: " + type);
		goalPoints = currentLevel * 75;
		goalPointsLabel.setText("Goal points: " + goalPoints);
		equationLabel.setText(getEquation());
		currentPointsLabel.setText("Current points: " + currentPoints);
		timer = new Timer();
		timeLeft = 40 + (currentLevel * 15);
		TimerTask task = new TimerTask()
		{
			public void run()
			{
				timeLeft--;
				if (timeLeft <= 0)
				{
					timer.cancel();
					displayAfterGameScreen();
				}
				timeLeftLabel.setText("Time left: " + timeLeft);
			}
		};
		timer.scheduleAtFixedRate(task, 1000, 1000);
	}

	/**
	 * 
	 */
	public void displayAfterGameScreen()
	{
		currentPointsAfterGameLabel.setText("Current points: " + currentPoints);
		goalPointsAfterGameLabel.setText("Goal points: " + goalPoints);
		winOrLoseLabel.setText(currentPoints >= goalPoints ? "YOU WIN!" : "YOU LOSE");
		afterGameWinOrLosePanel.setVisible(true);
		gamePanel.setVisible(false);
	}

	/**
	 * 
	 */
	public void displayDivisionTip()
	{
		if (mathType.equals("Division"))
		{
			roundYourAnswerLabel.setVisible(true);
		}
	}

	/**
	 * 
	 */
	public void displayMenu()
	{
		menuControlPanel.setVisible(true);
		mainMenuLabel.setVisible(true);
		gamePanel.setVisible(false);
		afterGameWinOrLosePanel.setVisible(false);
		currentPoints = 0;
		timeLeftLabel.setText("Time left: ");
	}

	/**
	 * @return
	 */
	public boolean isAnyRadioButtonSelected()
	{
		for (int i = 0; i < radioButtonList.size(); i++)
		{
			if (radioButtonList.get(i).isSelected())
			{
				return true;
			}
		}
		return false;
	}

	/**
	 * @return
	 */
	public boolean isGameRunning()
	{
		return gamePanel.isVisible();
	}

	/**
	 * 
	 */
	public void userAnsweredAQuestion()
	{
		String userAnswer;
		Double userAnswerDouble;
		userAnswer = answerTextField.getText();
		answerTextField.setText("");
		try
		{
			userAnswerDouble = Double.parseDouble(userAnswer);
		} catch (Exception e)
		{
			userAnswerDouble = Double.MIN_VALUE;
		}
		String[] equation = equationLabel.getText().split(" ");
		if (MathLogic.userAnswerChecker(Integer.valueOf(equation[0]), Integer.valueOf(equation[2]), equation[1],
				userAnswerDouble))
		{
			currentPoints += 6 * currentLevel + (currentLevel * 2);
			currentPointsLabel.setText("Current points: " + currentPoints);
			if (currentPoints >= goalPoints)
			{
				timer.cancel();
				if (currentLevel == 6)
				{
					displayAfterGameScreen();
				} else
				{
						displayAfterGameScreen();
				}
			}
		} else
		{
			currentPoints -= 4 * currentLevel;
			currentPointsLabel.setText("Current points: " + currentPoints);
			if (currentPoints <= 0)
			{
				currentPoints = 0;
				currentPointsLabel.setText("Current points: " + currentPoints);
			}
		}
		equationLabel.setText(getEquation());

	}

	/**
	 * 
	 * @param e
	 */
	@Override
	public void actionPerformed(ActionEvent e)
	{
		if (e.getSource() == submitButton)
		{
			userAnsweredAQuestion();
		} else if ((e.getSource() == quitButton) || (e.getSource() == backToMainMenuButton))
		{
			timer.cancel();
			displayMenu();
		} else if ((e.getSource() == levelOneButton) || (e.getSource() == levelTwoButton)
				|| (e.getSource() == levelThreeButton) || (e.getSource() == levelFourButton)
				|| (e.getSource() == levelFiveButton) || (e.getSource() == levelSixButton))
		{
			String[] buttonText = ((JButton) e.getSource()).getText().split(" ");
			int level = Integer.parseInt(buttonText[1]);
			startLevel(level);
		} else if ((e.getSource() == additionRadioButton) || (e.getSource() == subtractionRadioButton)
				|| (e.getSource() == multiplicationRadioButton) || e.getSource() == divisionRadioButton)
		{
			mathType = (getSelectedRadioButtonText());
		}

	}

	/**
	 * @param level
	 */
	public void startLevel(int level)
	{
		if (isAnyRadioButtonSelected())
		{
			currentLevel = level;
			displayGame(level, mathType);
		}
	}

	/**
	 * @return
	 */
	public String getSelectedRadioButtonText()
	{
		for (int i = 0; i < radioButtonList.size(); i++)
		{
			if (radioButtonList.get(i).isSelected())
			{
				return radioButtonList.get(i).getText();
			}
		}
		return "";
	}

	/**
	 * @return
	 */
	public String getEquation()
	{
		int[] twoNumbers = MathLogic.generateTwoRandomNumbers(currentLevel);
		currentEquation = twoNumbers[0] + " " + getMathType() + " " + twoNumbers[1] + "    = ";
		return currentEquation;
	}

	/**
	 * @return
	 */
	public String getMathType()
	{
		String operator;
		switch (mathType)
		{
		case "Addition":
			operator = "+";
			break;
		case "Subtraction":
			operator = "-";
			break;
		case "Multiplication":
			operator = "*";
			break;
		case "Division":
			operator = "/";
			break;
		default:
			operator = "";
			break;
		}
		return operator;
	}

	/**
	 * @param args
	 */
	public static void main(String[] args)
	{
		new MathLearningGame();
	}

}