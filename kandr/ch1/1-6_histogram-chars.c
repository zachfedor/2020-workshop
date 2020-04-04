#include <stdio.h>

/* create histogram of input characters */
int main()
{
    int c, i, j, other;
    int nchars[26];

    other = 0;
    for (i = 0; i < 26; ++i)
        nchars[i] = 0;

    while ((c = getchar()) != EOF)
        if (c >= 'a' && c <= 'z')
            ++nchars[c - 'a'];
        else if (c >= 'A' && c <= 'Z')
            ++nchars[c - 'A'];
        else
            ++other;

    printf("character count:\n");
    for (i = 0; i < 26; ++i) {
        putchar(i+'a');
        printf(" - %d\t", nchars[i]);
        for (j = 0; j < nchars[i]; ++j)
            putchar('#');
        printf("\n");
    }
    printf("other - %d\n", other);
}
