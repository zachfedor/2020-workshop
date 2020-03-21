#include <stdio.h>

/* print Fahrenheit-Celsius table
 * for fahr = 0, 20, ..., 300
 * with floating point division */
int main()
{
    float fahr, celsius;
    int lower, upper, step;

    lower = 0;    /* lower limit of temerature table */
    upper = 300;  /* upper limit */
    step  = 20;   /* step size */

    printf("Fahr   Cels\n");
    printf("----   ----\n");

    fahr = lower;
    while (fahr <= upper) {
        celsius = (5.0/9.0) * (fahr-32.0);
        printf("%4.0f %6.1f\n", fahr, celsius);
        fahr = fahr + step;
    }

    printf("\n\nCels  Fahr\n");
    printf("----  ----\n");

    lower = -100;
    upper = 200;
    celsius = lower;

    while (celsius <= upper) {
        fahr = (celsius*9)/5 + 32;
        printf("%4.0f %5.0f\n", celsius, fahr);
        celsius = celsius + step;
    }
}
