#include <stdio.h>

/* copy input to output */
int main()
{
    int c;

    printf("Char is not EOF: %d\n", getchar() != EOF);
    printf("EOF is: %d\n", EOF);

    while ((c = getchar()) != EOF) {
        putchar(c);
    }
}
