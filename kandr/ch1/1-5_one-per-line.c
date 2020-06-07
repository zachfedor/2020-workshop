#include <stdio.h>

#define IN  1   /* inside a word */
#define OUT 0   /* inside a word */

/* copy input to output, one word per line */
int main()
{
    int c;

    while ((c = getchar()) != EOF) {
        if (c == ' ' || c == '\n' || c == '\t')
            putchar('\n');
        else
            putchar(c);
    }
}