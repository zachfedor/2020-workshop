#include <stdio.h>

/* copy input to output, but trim whitespace */
int main()
{
    int c, trim;

    trim = 0;
    while ((c = getchar()) != EOF) {
        if (c == ' ') {
            if (trim == 0) {
                trim = 1;
                putchar(c);
            }
        } else {
            trim = 0;
            putchar(c);
        }
    }
}
