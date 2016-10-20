import java.util.*;

public class MathLogic
{
	/**
	 * @param level
	 * @return
	 */
	public static int[] generateTwoRandomNumbers(int level)
	{
		Random rand = new Random();
		int[] generatedNumbers = new int[2];
		int number1 = 0;
		int number2 = 0;
		switch (level)
		{
		case 1:
			number1 = rand.nextInt(10);
			number2 = rand.nextInt(9) + 1;
			while (number1 < number2)
			{
				number1 = rand.nextInt(10);
				number2 = rand.nextInt(9) + 1;
			}
			break;
		case 2:
			number1 = rand.nextInt(90) + 10;
			number2 = rand.nextInt(9) + 1;
			break;
		case 3:
			number1 = rand.nextInt(90) + 10;
			number2 = rand.nextInt(90) + 10;
			while (number1 < number2)
			{
				number1 = rand.nextInt(90) + 10;
				number2 = rand.nextInt(90) + 10;
			}
			break;
		case 4:
			number1 = rand.nextInt(900) + 100;
			number2 = rand.nextInt(9) + 1;
			break;
		case 5:
			number1 = rand.nextInt(900) + 100;
			number2 = rand.nextInt(90) + 10;
			break;
		case 6:
			number1 = rand.nextInt(900) + 100;
			number2 = rand.nextInt(900) + 100;
			while (number1 < number2)
			{
				number1 = rand.nextInt(900) + 100;
				number2 = rand.nextInt(900) + 100;
			}
			break;
		default:
			number1 = 1;
			number2 = 1;
			break;
		}
		generatedNumbers[0] = number1;
		generatedNumbers[1] = number2;
		return generatedNumbers;
	}

	/**
	 * @param number1
	 * @param number2
	 * @param mathType
	 * @param userAnswer
	 * @return
	 */
	public static boolean userAnswerChecker(int number1, int number2, String mathType, double userAnswer)
	{
		boolean isUserCorrect;
		switch (mathType)
		{
		case "+":
			isUserCorrect = (number1 + number2 == userAnswer);
			break;
		case "-":
			isUserCorrect = (number1 - number2 == userAnswer);
			break;
		case "*":
			isUserCorrect = (number1 * number2 == userAnswer);
			break;
		case "/":
			double answer = (double) number1 / number2;
			isUserCorrect = ((Math.round(answer * 100d) / 100d) == userAnswer);
			break;
		default:
			isUserCorrect = false;
			break;
		}
		return isUserCorrect;
	}

}
