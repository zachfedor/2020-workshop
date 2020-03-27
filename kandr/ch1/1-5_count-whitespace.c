#include <stdio.h>

/* count spaces, tabs, and newlines in input */
int main()
{
    int c;
    double sp, tb, nl;

    sp = 0;
    tb = 0;
    nl = 0;
    while ((c = getchar()) != EOF) {
        if (c == ' ')
            ++sp;
        else if (c == '\t')
            ++tb;
        else if (c == '\n')
            ++nl;
    }
    printf("spaces: %.0f\ttabs: %.0f\tnewlines: %.0f\n", sp, tb, nl);
}
