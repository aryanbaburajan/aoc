#include <bits/stdc++.h>

int main()
{
    std::vector<int> a, b;

    std::string line;
    while (std::getline(std::cin, line))
    {
        a.push_back(std::stoi(line.substr(0, 5)));
        b.push_back(std::stoi(line.substr(8, 5)));
    }

    int n = a.size();
    int result = 0;

    std::vector<int> frequency(999999);

    for (int i = 0; i < n; i++)
        frequency[b[i]]++;

    for (int i = 0; i < n; i++)
        result += a[i] * frequency[a[i]];

    std::cout << result << std::endl;
}