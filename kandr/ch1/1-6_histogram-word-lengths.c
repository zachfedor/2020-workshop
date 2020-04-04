#include <stdio.h>

#define IN  1 /* inside a word */
#define OUT 0 /* outside a word */

/* count word lengths of input */
int main()
{
    int c, i, l, max, state;
    int lwords[11];

    for (i = 0; i < 11; ++i)
        lwords[i] = 0;

    l = max = 0;
    state = OUT;

    while ((c = getchar()) != EOF) {
        if (c == '\n' || c == '\t' || c == ' ') {
            state = OUT;
            if (l > 9)
                l = 10;
            ++lwords[l];
        } else if (state == OUT) {
            state = IN;
            l = 1;
        } else {
            ++l;
        }
    }

    for (i = 0; i < 11; ++i)
        if (max < lwords[i])
            max = lwords[i];

    printf("word lengths: \n");
    for (; max > 0; --max) {
        for (i = 0; i < 11; ++i)
            if (lwords[i] >= max)
                printf(" # ");
            else
                printf("   ");
        printf("\n");
    }


    printf("len");
    for (i = 1; i < 10; ++i)
        printf(" %d ", i);
    printf(" 10+\n");
}
