#include <stdio.h>

float tocelsius(int fahr);
float tofahrenheit(int cels);

/* test temperature conversion functions */
int main()
{
    int i;

    for (i = 0; i <= 300; i = i + 20)
        printf("%d\t%6.2f\t%6.2f\n", i, tocelsius(i), tofahrenheit(i));

    return 0;
}

/* tocelsius: convert fahrenheit to celsius */
float tocelsius(int fahr)
{
    return (5.0/9.0) * (fahr-32.0);
}

/* tofahrenheit: convert celsius to fahrenheit */
float tofahrenheit(int cels)
{
    return (cels*9.0)/5.0 + 32.0;
}
